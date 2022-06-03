//Cards
// SideA - Question
// SideB - Answer
// DeckID
// DeckTitle

const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
    {
        sideA: {
            type: String,
            required: true,
        },
        sideB: {
            type: String,
            required: true,
        },
        deck: {
            type: Schema.Types.ObjectId,
            ref:'deck'
        },
        deckTitle: {
            type: String
        },
           
    }
);

const Card = model('card', cardSchema);

module.exports = Card;