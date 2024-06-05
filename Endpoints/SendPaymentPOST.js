const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');

const client = new Client({
  host: 'localhost',
  port: 10001,
  username: 'bartek',
  password: 'barteks'
});

router.post('/send-payment', async (req, res) => {
    const { fromAddress, privateKey, toAddress, amount } = req.body;
  
    try {
      // Pobieranie UTXO (Unspent Transaction Outputs) dla adresu
      const utxos = await client.listUnspent(1, 9999999, [fromAddress]);
  
      if (utxos.length === 0) {
        return res.status(400).json({ error: 'No UTXOs available for this address' });
      }
  
      // Tworzę transakcji
      const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });
  
      let inputAmount = 0;
  
      // Dodaję wejścia do transakcji
      utxos.forEach(utxo => {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          nonWitnessUtxo: Buffer.from(utxo.scriptPubKey, 'hex')
        });
        inputAmount += utxo.amount * 1e8;
      });
  
      // Dodaj wyjście do transakcji
      const outputAmount = Math.floor(amount * 1e8); // Konwertuję BTC do satoshi
      const fee = 10000; // Ustalam opłatę transakcyjną (w satoshis)
      psbt.addOutput({
        address: toAddress,
        value: outputAmount
      });
  
      // Dodaję wyjście do transakcji (reszta)
      if (inputAmount > outputAmount + fee) {
        psbt.addOutput({
          address: fromAddress,
          value: inputAmount - outputAmount - fee
        });
      }
  
      // Podpisywanie transakcji
      const keyPair = bitcoin.ECPair.fromWIF(privateKey, bitcoin.networks.testnet);
      psbt.signAllInputs(keyPair);
      psbt.finalizeAllInputs();
  
      // Uzyskaj hex transakcji
      const tx = psbt.extractTransaction().toHex();
  
      // Wyślij transakcję
      const txid = await client.sendRawTransaction(tx);
  
      res.json({ txid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router