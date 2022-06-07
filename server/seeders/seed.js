const db = require('../config/connection');

const { Deck, User, Category } = require('../models');

const deckData = require('./deckData.json');
const cardData = require('./cardData.json');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');

db.once('open', async () => {
  // clear database
  await Deck.deleteMany({});
  await User.deleteMany({});
  await Category.deleteMany({});

  // bulk create
  const categories = await Category.insertMany(categoryData);
  const decks = await Deck.insertMany(deckData);
  const users = await User.insertMany(userData);
  
  for (i = 0; i < decks.length; i++) {
    await User.findByIdAndUpdate(users[i], { $addToSet: { decks: decks[i]._id } });
    for (j = 0; j < cardData.length; j++) {
      await Deck.findByIdAndUpdate(
        decks[i]._id, 
        {
          creator: users[i]._id, 
          $addToSet: {
            category: categories[i]._id, 
            cards: { ...cardData[j], deck: decks[i]._id }
          }
        }
      );
    };
  };
 

  console.log('database seeded!');
  process.exit(0);
})