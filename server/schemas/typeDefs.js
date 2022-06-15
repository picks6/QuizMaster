const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
    permissions: [ID]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Checkout {
    session: ID
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [ID]
  }

  type Category {
    _id: ID
    category: String
  }

  type Deck {
    _id: ID
    title: String
    categories: [Category]
    description: String
    price: Float
    creator: User
    date_created: String
    cards: [Card]
  }
  type Card {
    _id: ID
    sideA: String!
    sideB: String!
    deck: ID
  }

  type Query {
    user: User
    checkout(products: [ID]!): Checkout
    categories: [Category]
    decks(deckTitle: String, categories: [ID]): [Deck]
    deck(deckId: ID!): Deck
    decksTitle(deckTitle: String!): [Deck] 
    decksCategory(categories: [ID]!): [Deck]
    card(deckId: String!, cardId: String!): Deck
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addCategories(categories: [String]!): [Category]
    addDeck(title: String!, categories: [ID]!, description: String, price: Float): Deck
    addCard(deckId: ID!, sideA: String!, sideB: String!): Deck

    updateUser(username: String, email: String, password: String, deckId: ID, permission: ID): User
    login( username: String, email: String!, password: String!): Auth
    updateDeck(deckId: ID!, title: String, categories: [ID], description: String, price: Float): Deck
    updateCard(deckId: ID!, cardId: ID!, sideA: String, sideB: String): Deck

    removeDeck(deckId: ID!): Deck
    removeCard(cardId: ID!): Deck
  }
`;

module.exports = typeDefs;
