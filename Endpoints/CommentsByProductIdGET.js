const express = require('express');
const router = express.Router();
const CommentsModel = require('../Schemas/CommentsSchema');
/**
 * @swagger
 * /api/comments/{product_id}:
 *  get:
 *    description: Use to request all comments for a specific product
 *    parameters:
 *      - name: product_id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the product
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of comments
 *      '404':
 *        description: No comments found for this product
 *      '500':
 *        description: Internal Server Error
 */

router.use(express.json());

router.get('/api/comments/:product_id', async (req, res) => {
    try {
        const comments = await CommentsModel.find({ product_id: req.params.product_id });
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;