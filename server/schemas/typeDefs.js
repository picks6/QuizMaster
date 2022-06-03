const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Deck {
    _id: ID
    title: String
    category: String
    description: String
    creator: ID
    date_created: String
    cards: [Card]
  }

  type Card {
    _id: ID
    sideA: String!
    sideB: String!
    deckTitle: String
    deck: ID
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    decks: [Deck]
    deck(deckId: ID): Deck
    deckTitle(deckTitle: String): Deck
    card(deck: ID): [Card]
    cards: [Card]
    user: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addDeck(title: String!, category: String!, description: String): Deck
    addCard(sideA: String!, sideB: String!, deck: ID!): Card
    updateCard(cardId: ID, sideA: String!, sideB: String!): Card
    updateUser(username: String, email: String, password: String, deck: ID): User
    updateDeck(title: String, category: String, description: String, cardId: ID): Deck
    login( username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
