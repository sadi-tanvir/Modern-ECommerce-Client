import { gql } from "@apollo/client";


export const GET_BRANDS = gql`
    query brands {
        brands {
            _id
            name
        }
    }
`;

export const GET_BRANDS_FOR_ADMIN = gql`
    query brands {
        brands {
            _id
            name
            description
            email
            phone
            website
            status
            location
        }
    }
`;

export const GET_BRAND_BY_ID = gql`
    query getBrandById($id: ID!) {
        getBrandById(id: $id) {
            _id
            name
            description
            email
            phone
            website
            status
            location
        }
    }
`;