import { gql } from '@apollo/client';

// used in DashboardPage.js
export const QUERY_USER = gql`
  query User {
    user {
      _id
      username
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
export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      category
    }
  }`;
// // not used
// export const GET_DECKS = gql`
//   query getDecks {
//     decks {
//       _id
//       title
//       categories {
//         _id
//         category
//       }
//       description
//       creator {
//         _id
//         username
//       }
//       date_created
//       cards {
//         _id
//         sideA
//         sideB
//       }
//     }
//   }`;
export const QUERY_DECKS = gql`
  query Decks($deckTitle: String, $categories: [ID]) {
    decks(deckTitle: $deckTitle, categories: $categories) {
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

export const QUERY_DECKS_TITLE = gql`
  query DecksTitle($deckTitle: String!) {
    decksTitle(deckTitle: $deckTitle) {
      _id
      title
      categories {
        _id
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
// // NOT USED:
// export const QUERY_CARD = gql`
//   query QueryCard($deckId: ID!, $cardId: ID!) {
//     card(deckId: $deckId, cardId: $cardId) {
//       cards {
//         _id
//         sideA
//         sideB
//         deck
//       }
//     }
//   }`;