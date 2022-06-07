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

const deckSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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
    cards: [cardSchema],
  }
);

const Deck = model('deck', deckSchema);

module.exports = Deck;

