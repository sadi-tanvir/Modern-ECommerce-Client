import { gql } from "@apollo/client";


export const GET_CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
    }
  }
`;



export const GET_CATEGORIES_WITH_IMAGE = gql`
  query categories {
    categories {
      _id
      name
      imageUrl
    }
  }
`;