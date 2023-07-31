import { gql } from "@apollo/client";



export const GET_PRODUCTS_NAME_AND_ID = gql`
    query products {
        products {
            _id
            name
            imageUrl
            unit
            category {
                id {
                    _id
                    name
                }
            }
            brand {
                id {
                    _id
                    name
                }
            }
        }
    }
`;