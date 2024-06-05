const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
const Client = require('bitcoin-core');

const client = new Client({
  host: 'localhost',
  port: 10001,
  username: 'bartek',
  password: 'barteks'
});

router.post('/get-balance', async (req, res) => {
    const { address } = req.body;
  
    try {
      const balance = await client.command('getreceivedbyaddress', address);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router