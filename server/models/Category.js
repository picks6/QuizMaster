const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

const Category = model('category', categorySchema);

module.exports = Category;