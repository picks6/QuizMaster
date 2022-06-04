const db = require('../config/connection');

const { Deck, Card, User } = require('../models');

const deckData = require('./deckData.json');
const cardData = require('./cardData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // clear database
  await Deck.deleteMany({});
  await Card.deleteMany({});
  await User.deleteMany({});

  // bulk create
  const decks = await Deck.insertMany(deckData);
  const users = await User.insertMany(userData);
  const cards = await Card.insertMany(cardData);

  console.log('database seeded!');
  process.exit(0);
})