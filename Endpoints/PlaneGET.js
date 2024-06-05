const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
/**
 * @swagger
 * /api/planes:
 *  get:
 *    description: Use to request all planes
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Country not found
 *      '500':
 *        description: Internal Server Error
 */
router.get('/api/planes', async (req, res) => {
  try {
    const documents = await PlanesModel.find(
      {},
      '-_id -detailed_description'
    )
    res.send(documents)
  } catch (error) {
    console.error(
      'Error retrieving data from collection:',
      error
    )
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
