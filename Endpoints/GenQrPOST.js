const express = require('express');
const router = express.Router();
const config = require('../bitcoinConfig');
const QRCode = require('qrcode');
const BitcoinCore = require('bitcoin-core');

const client = new BitcoinCore({
  ...config,
  wallet: config.wallet,
});

router.post('/api/generate-qr', async (req, res) => {
  const { address, amount } = req.body;

  if (!address || !amount) {
    return res.status(400).json({ error: 'Address and amount are required' });
  }

  try {
    const uri = `bitcoin:${address}?amount=${amount}`;
    const qrCodeUrl = await QRCode.toDataURL(uri);
    res.json({ qrCodeUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
