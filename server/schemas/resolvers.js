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
    // order: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category'
    //     });

    //     return user.orders.id(_id);
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
    checkout: async (parent, args, context) => {
      console.log('test');
      const url = new URL(context.headers.referer).origin;
      // const order = new Order({ products: args.products });
      console.log('url:', url);
      const line_items = [];
      
      const products = [
        {"_id":"62a4b2a8076f279593d56f98","image":"canned-coffee.jpg","name":"Canned Coffee","price":1.99,"quantity":500,"purchaseQuantity":1},
        {"_id":"62a4b2a8076f279593d56f98","image":"canned-coffee.jpg","name":"Canned Coffee","price":1.99,"quantity":500,"purchaseQuantity":1}
      ];

      // const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          // images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/checkout?success=true`,
        cancel_url: `${url}/checkout?canceled=true`
      });
      console.log('session');
      console.log('session:', session);

      return { session: session.id };
    },
    // // NOT USED:
    // category: async (parent, args) => { // args: { categoryID: ID, category: String }
    //   return await Category.findOne(
    //     { $or: [{ _id: args.categoryID }, { category: args.category }] }
    //   );
    // },
    categories: async () => { // return all categories
      return await Category.find({});
    },
    deck: async(parent, {deckId}) => {
      return await Deck.findOne({ _id: deckId });
    },
    decks: async (parent, {deckTitle, categories}) => { // { deckTitle: String, categories: [ID] }
      // console.log('test:', deckTitle, categories);
      const categorySelectors = categories.map(id => ({ categories: { _id: id } }));
      return await Deck.find(
        { title: { $regex: deckTitle }, $or: categorySelectors }
      ).populate('categories creator');
    },
    decksTitle: async(parent, {deckTitle}) => {
      return await Deck.find({ title: { $regex: deckTitle }}).populate('categories creator');
    },
    decksCategory: async(parent, {categories}) =>{ // category: [ID]
      // console.log('args:', categories);
      const selectors = categories.map(id => ({ categories: { _id: id } }));
      // console.log('deckCategory:', selectors);
      return await Deck.find({ $or: selectors}).populate('categories creator');
    },
		card: async (parent, args) => {
			if (args.cardId && args.deckId) {
				// for testing
				return await Deck.findById(
					// args.deckId, { cards: { $elemMatch: { _id: args.cardId} }}
					args.deckId
				);
			}
			// return await Card.find({deck: args.deck});
		},
  },
  Mutation: {
    addUser: async (parent, args) => { // args: { username: String!, email: String!, password: String! }
      const user = await User.create(args);
      const token = signToken(user);

			return { token, user };
		},
		addCategories: async (parent, { categories }) => {
			// categories: [String]!
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
      // console.log('newDeck:', newDeck);
      // const updatedUser = 
      await User.findByIdAndUpdate(context.user._id, {$addToSet: { decks: newDeck._id}});
      // console.log('user:', updatedUser);
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
      // args: { username: String, email: String, password: String, deck: ID, permission: ID }
      // if (context.user) {
      //   return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      // } 
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
    // // NOT USED:
    // updateCategory: async (parent, args, context) => { // args: { categoryId: ID!, category: String! }
    //   if (context.deck) { 
    //     return await Category.findByIdAndUpdate(context.category._id, args, {new: true});
    //   } 
    // //   if (args.cardId) { // for backend testing
    // //     return await Deck.findOneAndUpdate(
    // //       { _id: args.deckId, "cards._id": args.cardId }, 
    // //       { $set: {"cards.$.sideA": args.sideA, "cards.$.sideB": args.sideB} }, 
    // //       { new: true }
    // //     );
    // //   }
    // },
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
      if (args.cardId) { // for backend testing
        return await Deck.findOneAndUpdate(
          { _id: args.deckId, "cards._id": args.cardId }, 
          { $set: {"cards.$.sideA": args.sideA, "cards.$.sideB": args.sideB} }, 
          { new: true }
        );
      }
    },
    removeDeck: async (parent, args, context) => {
      if (context.user) {
        return Deck.findOneAndDelete({ creator: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCard: async (parent, args, context) => {
      if (context.user) {
        return Card.findOneAndDelete({ creator: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
