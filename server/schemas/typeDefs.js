const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Deck {
    _id: ID
    title: String
    category: [ID]
    description: String
    creator: ID
    date_created: String
    cards: [Card]
  }

  type Card {
    _id: ID
    sideA: String!
    sideB: String!
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
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    category: String
  }

  type Query {
    decks: [Deck]
    deck(deckId: ID!): Deck
    deckTitle(deckTitle: String!): Deck
    card(deckId: ID!, cardId: ID!): Deck
    category(categoryID: ID, category: String): Category
    user: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addDeck(title: String!, category: String!, description: String): Deck
    addCard(deckId: ID!, sideA: String!, sideB: String!): Deck
    updateCard(deckId: ID!, cardId: ID!, sideA: String!, sideB: String!): Deck
    updateUser(username: String, email: String, password: String, deckId: ID): User
    updateDeck(deckId: ID!, title: String, category: String, description: String): Deck
    login( username: String, email: String!, password: String!): Auth
    addCategory(categoryID: ID!, category: String!): Category
    updateCategory(categoryID: ID!, category: String!): Category
  }
`;

module.exports = typeDefs;
