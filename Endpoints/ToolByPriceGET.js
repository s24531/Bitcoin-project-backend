const express = require('express')
const router = express.Router()
const ToolsModel = require('../Schemas/ToolsSchema')
/**
 * @swagger
 * /api/tools/price:
 *  get:
 *    description: Use to request all tools within a certain price range
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
 *        description: No tools found in this price range
 *      '500':
 *        description: Internal Server Error
 */
router.get('/api/tools/price', async (req, res) => {
    const minPrice = Number(req.query.price)
    const maxPrice = Number(req.query.price)
    try {
        const tools = await ToolsModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        })
        if (tools.length > 0) {
            res.json(tools)
        } else {
            res.status(404).send('No tools found in this price range')
        }
    } catch (error) {
        console.error('Error while fetching tools:', error)
    }   
})

module.exports = router