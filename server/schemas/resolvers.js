const { AuthenticationError } = require('apollo-server-express');
const { Deck, Card, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    decks: async () => {
      //return all decks
      return await Deck.find({});
    },
    deck: async(parent, {deckId}) => {
      return await Deck.findOne({ _id: deckId });
    },
    deckTitle: async(parent,{deckTitle}) =>{
      return await Deck.findOne({title: deckTitle})
    },
    card: async (parent, args) => {
      if (args.cardId && args.deckId) { // for testing
        return await Deck.findById(args.deckId, { cards: { $elemMatch: { _id: args.cardId }} });
      }
      return await Card.find({deck: args.deck});
    },
    //find the user by ID, populate decks and cards
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate({ path: 'decks', populate: 'cards' });
      }
    },
  },
  Mutation: {
    //this is creating a user from the sign up page
    addUser: async (parent, args) => {
      // args: { username: String!, email: String!, password: String! }
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //addDeck
    addDeck: async (parent, {title, category, description}, context) => {
      const deck = await Deck.create({title, category, description});
      return deck;
    },
    // addCard
    addCard: async (parent, {sideA, sideB, deckId}) => {
      return await Deck.findByIdAndUpdate(
        deckId, { $addToSet: { cards: { sideA, sideB, deck: deckId } }}, { new: true }
      );
    },
    // Update User
    updateUser: async (parent, args, context) => {
      // args: { username: String, email: String, password: String, deck: ID }
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      } 
      if (args.deckId) { // for backend testing
        return await User.findOneAndUpdate( // add Deck to User
          { username: args.username}, { $addToSet: { decks: args.deckId } }, { new: true }
        ).populate('decks');
      }
      throw new AuthenticationError('Not logged in');
    },
    //Update Deck 
    updateDeck: async (parent, args, context) => {
      // args: { deckId: ID!, title: String, category: String, description: String }
      if (context.deck) {
        return await Deck.findByIdAndUpdate(context.deck._id, args, {new: true});
      }
      if (args.deckId) { // for backend testing
        return await Deck.findByIdAndUpdate(
          args.deckId, { ...args }, { new: true }
        );
      }
    },
    //Update Card
    updateCard: async (parent, args, context) => {
      // args: { deckId: ID!, cardId: ID, sideA: String!, sideB: String! }
      if (context.deck) { // TODO: Reconfigure to query Deck for Cards to update
        return await Card.findByIdAndUpdate(context.card._id, args, {new: true});
      } 
      if (args.cardId) { // for backend testing
        return await Deck.findOneAndUpdate(
          { _id: args.deckId, "cards._id": args.cardId }, 
          { $set: {"cards.$.sideA": args.sideA, "cards.$.sideB": args.sideB} }, 
          { new: true }
        );
      }
    },
    //Login check is by email, password requirement is 8 characters
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne(
        { $or: [{ username }, { email }] }
      );

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;