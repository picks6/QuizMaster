const { AuthenticationError } = require('apollo-server-express');
const { Deck, Card, User, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return await User.findById(
        context.user._id
      ).populate({ path: 'decks', populate: 'categories cards' });
    },
    checkout: async (parent, args, context) => {
      // console.log('test', args);
      const url = new URL(context.headers.referer).origin;
      // console.log('url:', url);
      const line_items = [];

      for (let i  =0; i < args.products.length; i++) {
        const deck = await Deck.findById(args.products[0]);
        const product = await stripe.products.create({
          name: deck.title,
          description: deck.description,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: deck.price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/checkout?success=true`,
        cancel_url: `${url}/checkout?canceled=true`
      });
      return { session: session.id };
    },
    categories: async () => { // return all categories
      return await Category.find({});
    },
    deck: async(parent, {deckId}) => {
      return await Deck.findOne({ _id: deckId });
    },
    decks: async (parent, {deckTitle, categories}) => { // { deckTitle: String, categories: [ID] }
      const categorySelectors = categories.map(id => ({ categories: { _id: id } }));
      return await Deck.find(
        { title: { $regex: deckTitle }, $or: categorySelectors }
      ).populate('categories creator');
    },
    decksTitle: async(parent, {deckTitle}) => {
      return await Deck.find({ title: { $regex: deckTitle }}).populate('categories creator');
    },
    decksCategory: async(parent, {categories}) =>{ // category: [ID]
      const selectors = categories.map(id => ({ categories: { _id: id } }));
      return await Deck.find({ $or: selectors}).populate('categories creator');
    },
		card: async (parent, args) => {
			if (args.cardId && args.deckId) {
				// for testing
				return await Deck.findById(
					args.deckId
				);
			}
		},
  },
  Mutation: {
    addUser: async (parent, args) => { // args: { username: String!, email: String!, password: String! }
      const user = await User.create(args);
      const token = signToken(user);

			return { token, user };
		},
		addCategories: async (parent, { categories }) => {
			const categoryData = categories.map((category) => ({
				category: category,
			}));

			return await Category.insertMany(categoryData);
		},

		addDeck: async (parent, args, context) => {
			console.log(args, context.user);
			const newDeck = await Deck.create({
				...args,
				creator: context.user._id,
			});
      const deck = await User.findByIdAndUpdate(context.user._id, {$addToSet: { decks: newDeck._id}});
      const permissions = await User.findByIdAndUpdate(context.user._id, {$addToSet: { permissions: newDeck._id}});
			return await newDeck.populate('categories creator');
		},
		addCard: async (parent, { sideA, sideB, deckId }, context) => {
			return await Deck.findByIdAndUpdate(
				deckId,
				{
					creator: context.user._id,
					$addToSet: { cards: { sideA, sideB, deck: deckId } },
				},
				{ new: true }
			);
    },
    // Update User
    updateUser: async (parent, args, context) => {
      if (args.permission) {
        console.log(context.user, args)
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id, { $addToSet: { permissions: args.permission }}, {new: true}
        );
        console.log(updatedUser);
        return updatedUser;
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

    updateDeck: async (parent, args, context) => {
      // args: { deckId: ID!, title: String, category: String, description: String }
      // if (args.deckId) { // for backend testing
      return await Deck.findOneAndUpdate(
        args.deckId, { ...args }, { new: true }
      ).populate('creator categories');
      // }
    },
    updateCard: async (parent, args, context) => {
      // args: { deckId: ID!, cardId: ID, sideA: String, sideB: String }
      try {
        if (args.sideA && args.sideB) { 
          return await Deck.findOneAndUpdate(
            { _id: args.deckId, "cards._id": args.cardId }, 
            { $set: {"cards.$.sideA": args.sideA, "cards.$.sideB": args.sideB} }, 
            { new: true }
          );
        } else if (args.sideA) { 
          return await Deck.findOneAndUpdate(
            { _id: args.deckId, "cards._id": args.cardId }, 
            { $set: { "cards.$.sideA": args.sideA } }, 
            { new: true }
          );
        } else if (args.sideB) { 
          return await Deck.findOneAndUpdate(
            { _id: args.deckId, "cards._id": args.cardId }, 
            { $set: { "cards.$.sideB": args.sideB } }, 
            { new: true }
          );
        };
      } catch (error) {
        console.log(error);
      }
    },
    removeDeck: async (parent, args, context) => {
      if (context.user) {
        return Deck.findOneAndDelete(
          { _id: args.deckId }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCard: async (parent, args, context) => {
      if (context.user) {
        const deleted = await Deck.findOneAndUpdate(
          {"cards._id": { "$eq": args.cardId }}, { $pull: { cards: { _id: args.cardId }} }, { new: true }
        ).populate('categories creator');
        console.log(deleted);
        return deleted;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
