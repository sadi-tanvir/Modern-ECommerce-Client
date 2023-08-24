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

export const GET_CATEGORIES_FOR_ADMIN = gql`
  query categories {
    categories {
      _id
      name
      description
      imageUrl
    }
  }
`;



export const GET_CATEGORY_BY_ID = gql`
  query getCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      _id
      name
      description
      imageUrl
    }
}
`
