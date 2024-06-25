const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/api/submit-payment-details', async (req, res) => {
  const { customer, cartItems, payment } = req.body;

  if (!customer || !cartItems || !payment) {
    console.error('Missing required fields:', { customer, cartItems, payment });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dataToSave = {
    customer,
    cartItems,
    payment,
  };

  try {
    // Ensure the directory exists
    const dirPath = path.join(__dirname, '../savedPayments');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    // Create a unique file name based on the date and payment address
    const fileName = `payment-details-${payment.address}.json`;
    const filePath = path.join(dirPath, fileName);

    // Log the file path for debugging
    console.log(`Saving payment details to: ${filePath}`);

    // Save the data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2), 'utf8');
    console.log('Payment details saved successfully.');

    res.json({ success: true, message: 'Payment details saved successfully' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
