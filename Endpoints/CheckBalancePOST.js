const express = require('express');
const router = express.Router();
const config = require('../bitcoinConfig');
const BitcoinCore = require('bitcoin-core');

const client = new BitcoinCore({
  ...config,
  wallet: config.wallet
});

router.post('/api/check-payment', async (req, res) => {
  const { address, amount } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    
    const transactions = await client.listTransactions('*', 10, 0, true);

    const payments = transactions.filter(tx => tx.address === address && tx.category === 'receive');
    const totalReceived = payments.reduce((sum, tx) => sum + tx.amount, 0);

    if (totalReceived > 0 && totalReceived === amount) {
      res.json({ success: true, message: 'Payment received', amount: totalReceived });
    }
    else if (totalReceived > 0 && totalReceived < amount) {
      res.json({ success: false, message: 'The amount is less than the required' });
    }
    else {
      res.json({ success: false, message: 'No payment received from this address' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;