import { gql } from '@apollo/client';

// used in DashboardPage.js
export const QUERY_USER = gql`
  query User {
    user {
      _id
      username
      email
      password
      decks {
        _id
        categories {
          category
          _id
        }
        title
        description
        date_created
        cards {
          _id
          sideA
          sideB
        }
      }
    }
  }`;
// not used
export const GET_DECKS = gql`
  query getDecks {
    decks {
      _id
      title
      categories {
        _id
        category
      }
      description
      creator {
        _id
        username
      }
      date_created
      cards {
        _id
        sideA
        sideB
      }
    }
  }`;
export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      category
    }
  }`;
export const QUERY_DECK = gql`
  query QueryDeck($deckId: ID!) {
    deck(deckId: $deckId) {
      _id
      title
      categories {
        _id
        category
      }
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
  query DecksTitle($deckTitle: String!) {
    decksTitle(deckTitle: $deckTitle) {
      _id
      title
      categories {
        _id
        category
      }
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
  query QueryCard($deckId: ID!, $cardId: ID!) {
    card(deckId: $deckId, cardId: $cardId) {
      cards {
        _id
        sideA
        sideB
        deck
      }
    }
  }`;
export const QUERY_DECKS_CATEGORY = gql`
  query DecksCategory($categories: [ID]!) {
    decksCategory(categories: $categories) {
      _id
      title
      categories {
        category
      }
      description
      creator {
        username
      }
      date_created
      cards {
        _id
        sideA
        sideB
      }
    }
  }`;