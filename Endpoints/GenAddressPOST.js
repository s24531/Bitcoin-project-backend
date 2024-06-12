const express = require('express')
const router = express.Router()
const config = require('../bitcoinConfig');
const BitcoinCore = require('bitcoin-core');

const client = new BitcoinCore({
  ...config,
  wallet: config.wallet
});


router.get('/api/generate-address', async (req, res) => {
  try {
    const address = await client.getNewAddress();
    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router