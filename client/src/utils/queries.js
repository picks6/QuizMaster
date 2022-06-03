import { gql } from '@apollo/client';
export const GET_DECKS = gql`
  query getDecks {
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
  }`;
export const QUERY_DECK = gql`
  query queryDeck($deckId: ID) {
    deck(deckId: $deckId) {
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
  }`;
export const QUERY_TITLE = gql`
  query DeckTitle($deckTitle: String) {
    deckTitle(deckTitle: $deckTitle) {
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
  }`;
export const QUERY_CARD = gql`
  query queryCard($deck: ID) {
    card(deck: $deck) {
      _id
      sideA
      sideB
      deckTitle
      deck
    }
  }`;
export const GET_CARDS = gql`
  query getCards {
    cards {
      _id
      sideA
      sideB
      deckTitle
      deck
    }
  }`;
export const QUERY_USER = gql`
  query queryUser {
    user {
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