const express = require('express')
const router = express.Router()
const ToolsModel = require('../Schemas/ToolsSchema')
/**
 * @swagger
 * /api/tools/{id}:
 *  get:
 *    description: Use to request a tool by id
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
router.get('/api/tools/:id', async (req, res) => {
  const toolId = req.params.id
  try {
    const tool = await ToolsModel.findOne(
      { id: toolId },
      '-detailed_description -_id'
    )
    if (!tool) {
      return res
        .status(404)
        .json({ error: 'Tool not found' })
    }
    res.json(tool)
  } catch (error) {
    console.error('Error retrieving tool data:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
