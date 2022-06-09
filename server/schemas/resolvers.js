const { AuthenticationError } = require('apollo-server-express');
const { Deck, Card, User, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, { user }) => {
      if (user) {
        return await User.findById(user._id).populate({ path: 'decks', populate: 'cards' });
      }
    },
    decks: async () => { // return all decks
      return await Deck.find({}).populate('categories creator');
    },
    deck: async(parent, {deckId}) => {
      return await Deck.findOne({ _id: deckId });
    },
    deckTitle: async(parent,{deckTitle}) =>{
      return await Deck.findOne({title: deckTitle})
    },
//deck category
    deckCategory: async(parent, {categoryID}) =>{ // category: [ID]
      console.log('args:', categoryID);
      const selectors = categoryID.map(id => ({ categories: { _id: id } }));
      console.log('deckCategory:', selectors);

      return await Deck.find(
        // { categories: { _id : deckCategory} }
        { $or: selectors}
      ).populate('categories creator');
    },

    card: async (parent, args) => {
      if (args.cardId && args.deckId) { // for testing
        return await Deck.findById(
          args.deckId, { cards: { $elemMatch: { _id: args.cardId} }}
        );
      }
      // return await Card.find({deck: args.deck});
    },

    categories: async () => { // return all categories
      return await Category.find({});
    },
    category: async (parent, args) => { // args: { categoryID: ID, category: String }
      return await Category.findOne(
        { $or: [{ _id: args.categoryID }, { category: args.category }] }
      );
    }
  },
  Mutation: {
    //this is creating a user from the sign up page
    addUser: async (parent, args) => { // args: { username: String!, email: String!, password: String! }
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addCategory: async (parent, { category }) => {
      return await Category.create({ category });
    },

    addDeck: async (parent, {title, categories, description}, context) => {
      console.log({title, description, categories})
      const newDeck = await Deck.create(
        { title, description, categories, creator: context.user._id }
      );
      return newDeck;
    },
    addCard: async (parent, {sideA, sideB, deckId}, context) => {
      return await Deck.findByIdAndUpdate(
        deckId, { creator: context.user._id, $addToSet: { cards: { sideA, sideB, deck: deckId } }}, { new: true }
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
    },

    updateCategory: async (parent, args, context) => { // args: { categoryId: ID!, category: String! }
      if (context.deck) { 
        return await Category.findByIdAndUpdate(context.category._id, args, {new: true});
      } 
    //   if (args.cardId) { // for backend testing
    //     return await Deck.findOneAndUpdate(
    //       { _id: args.deckId, "cards._id": args.cardId }, 
    //       { $set: {"cards.$.sideA": args.sideA, "cards.$.sideB": args.sideB} }, 
    //       { new: true }
    //     );
    //   }
    },

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
    }
  }
};

module.exports = resolvers;