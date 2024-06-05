const express = require('express')
const router = express.Router()
const PlanesModel = require('../Schemas/PlanesSchema')
/**
 * @swagger
 * /api/planes/price:
 *  get:
 *    description: Use to request all planes within a certain price range
 *    parameters:
 *      - name: minPrice
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *      - name: maxPrice
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: No planes found in this price range
 *      '500':
 *        description: Internal Server Error
 */
router.get('/api/planes/price', async (req, res) => {
    const minPrice = Number(req.query.price)
    const maxPrice = Number(req.query.price)
    try {
        const planes = await PlanesModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        })
        if (planes.length > 0) {
            res.json(planes)
        } else {
            res.status(404).send('No planes found in this price range')
        }
    } catch (error) {
        console.error('Error while fetching planes:', error)
    }   
})

module.exports = router