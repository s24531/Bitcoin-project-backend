const express = require('express');
const router = express.Router();
const CommentsModel = require('../Schemas/CommentsSchema');
const moment = require('moment-timezone');
/**
 * @swagger
 * /api/comments:
 *  post:
 *    description: Use to post a comment for a specific product
 *    parameters:
 *      - name: comment
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            product_id:
 *              type: number
 *            comment:
 *              type: string
 *            rating:
 *              type: number
 *            username:
 *              type: string
 *        description: The comment for the product
 *    responses:
 *      '201':
 *        description: Comment created successfully
 *      '400':
 *        description: Bad request, check your input data
 *      '500':
 *        description: Internal Server Error
 */

router.post('/api/comments', async (req, res) => {
    const newComment = new CommentsModel({
        product_id: req.body.product_id,
        comment: req.body.comment,
        rating: req.body.rating,
        username: req.body.username,
        date: moment().tz('Europe/Warsaw').add(1, 'hours').format()
    });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;