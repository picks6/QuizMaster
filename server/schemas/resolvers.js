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
      if (args.cardId) { // for testing
        return await Card.findOne({ _id: args.cardId });
      }
      return await Card.find({deck: args.deck});
    },
    cards: async (parent, args) => {
      return Card.find({});
    },
    //find the user by ID, populate decks and cards
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'decks',
          populate: 'cards'
        });
        return user;
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
    addDeck: async (parent, {title, category, description}) => {
      const deck = await Deck.create({title, category, description});
      return deck;
    },
    // addCard
    addCard: async (parent, {sideA, sideB, deck}) => {
        const card = await Card.create({sideA, sideB, deck});
        return card;
    },
    // Update User
    updateUser: async (parent, args, context) => {
      // args: { username: String, email: String, password: String, deck: ID }
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      } 
      if (args.deck) { // for backend testing
        return await User.findOneAndUpdate(
          { username: args.username}, { $addToSet: { decks: args.deck } }, { new: true }
        ).populate(
          { 
            path: 'decks', 
            // populate: { path: 'cards' } 
          }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
    //Update Deck 
    updateDeck: async (parent, args, context) => {
      if (context.deck) {
        return await Deck.findByIdAndUpdate(context.deck._id, args, {new: true});
      }
      if (args.cardId) { // for backend testing
        return await Deck.findOneAndUpdate(
          { title: args.title }, { $addToSet: { cards: args.cardId } }, { new: true }
        ).populate({ path: 'cards' });
      }
    },
    //Update Card
    updateCard: async (parent, args, context) => {
      // args: { cardId: ID, sideA: String!, sideB: String! }
      if (context.deck) {
        return await Card.findByIdAndUpdate(context.card._id, args, {new: true});
      } 
      if (args.cardId) { // for backend testing
        return await Card.findOneAndUpdate(
          { _id: args.cardId }, { sideA: args.sideA, sideB: args.sideB }, { new: true }
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