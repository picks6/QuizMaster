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
export const ADD_DECK = gql`
  mutation AddDeck($title: String!, $category: String!, $description: String) {
    addDeck(title: $title, category: $category, description: $description) {
      _id
      title
      categories
      description
      creator
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
      categories
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
export const UPDATE_CARD = gql`
  mutation UpdateCard($deckId: ID!, $cardId: ID!, $sideA: String!, $sideB: String!) {
    updateCard(deckId: $deckId, cardId: $cardId, sideA: $sideA, sideB: $sideB) {
      _id
      title
      categories
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
  mutation UpdateUser($password: String, $email: String, $username: String, $deckId: ID) {
    updateUser(password: $password, email: $email, username: $username, deckId: $deckId) {
      _id
      username
      email
      password
      decks {
        _id
        title
        categories
        description
        creator
        date_created
        cards {
          _id
          sideA
          sideB
          deck
        }
      }
    }
  }`;
export const UPDATE_DECK = gql`
  mutation UpdateDeck($deckId: ID!, $description: String, $category: String, $title: String) {
    updateDeck(deckId: $deckId, description: $description, category: $category, title: $title) {
      title
      categories
      description
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
