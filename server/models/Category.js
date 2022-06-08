const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        }
    }
);

const Category = model('category', categorySchema);

module.exports = Category;