//Deck
//DeckID
//Title
//Category
//CreateDate
//Creator
//Cards

const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const cardSchema = require('./Card');
const categorySchema = require('./Category')
// need dateFormat utility
const dateFormat = require('../utils/dateFormat');
const categories = require('./Category');

const deckSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'category',
      }
    ],
    description: {
      type: String,
    },
    //need date formatting 
    date_created: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    
    },
    creator:{
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    price: {
      type: Number,
    },
    cards: [cardSchema],
  }
);

deckSchema
  .virtual('getCategories')
  // Getter
  .get(function () {
    return this.categories.length;
  });

const Deck = model('deck', deckSchema);

module.exports = Deck;

