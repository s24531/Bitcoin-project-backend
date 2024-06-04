const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    product_id: {
        type: Number,
        min: 1,
        max: 10,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    date: Date,
    username: String
}, { versionKey: false });

module.exports = mongoose.model("opinions", commentsSchema);