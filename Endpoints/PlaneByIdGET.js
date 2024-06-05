const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
/**
 * @swagger
 * /api/planes/{id}:
 *  get:
 *    description: Use to request a plane by id
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
router.get('/api/planes/:id', async (req, res) => {
  const planeId = req.params.id
  try {
    const plane = await PlanesModel.findOne(
      { id: planeId },
      '-detailed_description -_id'
    )
    if (!plane) {
      return res
        .status(404)
        .json({ error: 'Plane not found' })
    }
    res.json(plane)
  } catch (error) {
    console.error('Error retrieving plane data:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
