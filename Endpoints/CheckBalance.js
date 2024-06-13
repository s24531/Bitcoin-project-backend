const express = require('express')
const router = express.Router()
const config = require('../bitcoinConfig');
const BitcoinCore = require('bitcoin-core');

const client = new BitcoinCore({
  ...config,
  wallet: config.wallet
});

router.get('/api/check-balance', async (req, res) => {
    try {
      const balance = await client.getBalance();
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router