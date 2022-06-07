const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        }
    }
);

// const Card = model('card', cardSchema);

module.exports = categorySchema;