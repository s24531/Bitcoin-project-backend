const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
/**
 * @swagger
 * /api/planes/product/details/{id}:
 *  get:
 *    description: Use to request a plane details by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Plane not found
 *      '500':
 *        description: Internal Server Error
 */
router.get('/api/planes/product/details/:id', async (req, res) => {
  const planeId = req.params.id
  try {
    const plane = await PlanesModel.findOne({ id: planeId }, '-_id -description')
    if (plane) {
      res.json(plane)
    } else {
      res.status(404).send('Plane not found')
    }
  } catch (error) {
    console.error('Error while fetching plane:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
