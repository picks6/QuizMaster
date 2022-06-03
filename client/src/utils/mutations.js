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
      category
      description
      creator
      date_created
    }
  }`;
export const ADD_CARD = gql`
  mutation AddCard($sideA: String!, $sideB: String!, $deck: ID!) {
    addCard(sideA: $sideA, sideB: $sideB, deck: $deck) {
      _id
      sideA
      sideB
      deckTitle
      deck
    }
  }`;
export const UPDATE_CARD = gql`
  mutation UpdateCard($sideA: String!, $sideB: String!, $cardId: ID!) {
    updateCard(sideA: $sideA, sideB: $sideB, cardId: $cardId) {
      _id
      sideA
      sideB
      deckTitle
      deck
    }
  }`;
export const UPDATE_USER = gql`
  mutation UpdateUser($deck: ID, $password: String, $email: String, $username: String) {
    updateUser(deck: $deck, password: $password, email: $email, username: $username) {
      _id
      username
      email
      password
      decks {
        _id
        title
        category
        description
        creator
        date_created
        cards {
          _id
          sideA
          sideB
          deckTitle
          deck
        }
      }
    }
  }`;
export const UPDATE_DECK = gql`
  mutation UpdateDeck($cardId: ID, $description: String, $category: String, $title: String) {
    updateDeck(cardId: $cardId, description: $description, category: $category, title: $title) {
      title
      category
      description
      creator
      date_created
      cards {
        sideA
        sideB
        deckTitle
      }
    }
  }`;
export const LOGIN_USER = gql`
  mutation Login($username: String, $email: String $password: String!) {
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
