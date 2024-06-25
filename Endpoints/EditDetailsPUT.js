const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

router.put('/api/edit-details', async (req, res) => {
    const { address, status } = req.body;
  try {
    const jsonFilePath = path.join(__dirname, `../savedPayments/payment-details-${address}.json`);

    let jsonData = await readJsonFile(jsonFilePath);
        if (jsonData.payment) {
            jsonData.payment.status = status;
        } else {
            return res.status(400).send('No payment data found in JSON');
        }

        await writeJsonFile(jsonFilePath, jsonData);
        res.status(200).send('Status has been updated');
        console.log(`Payment status has been updated in payment-details-${address}.json`)
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (err) {
                reject(err);
            }
        });
    });
}

function writeJsonFile(filePath, jsonData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}


module.exports = router