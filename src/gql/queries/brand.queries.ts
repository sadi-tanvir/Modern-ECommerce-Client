import { gql } from "@apollo/client";


export const GET_BRANDS = gql`
    query brands {
        brands {
            _id
            name
        }
    }
`;