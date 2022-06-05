import { gql } from '@apollo/client';

export const GET_DECKS = gql`
  query GetDecks {
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
      }
    }
  }`;
export const QUERY_DECK = gql`
  query QueryDeck($deckId: ID) {
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
      }
    }
  }`;
export const QUERY_CARD = gql`
  query Card($deckId: ID, $cardId: ID) {
    card(deckId: $deckId, cardId: $cardId) {
      cards {
        _id
        sideA
        sideB
        deck
      }
    }
  }`;
export const QUERY_USER = gql`
  query QueryUser {
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
        date_created
        cards {
          _id
        }
      }
    }
  }`;

