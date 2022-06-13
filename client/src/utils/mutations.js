import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }`;
export const ADD_CATEGORIES = gql`
  mutation AddCategories($categories: [String]!) {
    addCategories(categories: $categories) {
      _id
      category
    }
  }`;
export const ADD_DECK = gql`
  mutation AddDeck($title: String!, $categories: [ID]!, $description: String, $price: Float) {
    addDeck(title: $title, categories: $categories, description: $description, price: $price) {
      _id
      title
      categories {
        _id
        category
      }
      description
      price
      creator {
        _id
        username
      }
      date_created
      cards {
        _id
      }
    }
  }`;
export const ADD_CARD = gql`
  mutation AddCard($deckId: ID!, $sideA: String!, $sideB: String!) {
    addCard(deckId: $deckId, sideA: $sideA, sideB: $sideB) {
      _id
      title
      categories {
        _id
        category
      }
      creator {
        _id
      }
      date_created
      cards {
        _id
        sideA
        sideB
        deck
      }
    }
  }`;
export const UPDATE_CARD = gql`
  mutation UpdateCard($deckId: ID!, $cardId: ID!, $sideA: String!, $sideB: String!) {
    updateCard(deckId: $deckId, cardId: $cardId, sideA: $sideA, sideB: $sideB) {
      _id
      title
      categories {
        _id
        category
      }
      creator
      date_created
      cards {
        _id
        sideA
        sideB
        deck
      }
    }
  }`;
export const UPDATE_USER = gql`
  mutation UpdateUser($permission: ID, $username: String, $email: String, $password: String, $deckId: ID) {
    updateUser(permission: $permission, username: $username, email: $email, password: $password, deckId: $deckId) {
      _id
      username
      email
      password
      permissions
      decks {
        _id
        title
        categories {
          _id
          category
        }
        description
        date_created
      }
    }
  }`;
export const UPDATE_DECK = gql`
  mutation UpdateDeck($deckId: ID!, $description: String, $category: [ID], $title: String, $price: Float) {
    updateDeck(deckId: $deckId, description: $description, categories: $category, title: $title, price: $price) {
      title
      categories {
        _id
        category
      }
      description
      price
      creator
      date_created
      cards {
        sideA
        sideB
      }
    }
  }`;
export const LOGIN_USER = gql`
  mutation Login($username: String, $email: String! $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }`;
