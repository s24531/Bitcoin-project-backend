const express = require('express')
const router = express.Router()
const ToolsModel = require('../Schemas/ToolsSchema')
/**
 * @swagger
 * /api/tools/product/details/{id}:
 *  get:
 *    description: Use to request a tool details by id
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
 *        description: Tool not found
 *      '500':
 *        description: Internal Server Error
 */
router.get('/api/tools/product/details/:id', async (req, res) => {
  const toolId = req.params.id
  try {
    const tool = await ToolsModel.findOne({ id: toolId }, '-_id -description')
    if (tool) {
      res.json(tool)
    } else {
      res.status(404).send('Tool not found')
    }
  } catch (error) {
    console.error('Error while fetching tool:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
