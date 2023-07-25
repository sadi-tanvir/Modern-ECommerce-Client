import { gql } from "@apollo/client"


export const GET_STOCKS_FOR_DISPLAY = gql`
    query getStocks {
        stocks {
            _id
            name
            description
            price
            discount
            imageUrl
            status
            unit
            quantity
            category {
                name
            }
            brand {
                name
            }
        }
    }
`;



// const GET_PRODUCTS = gql`
//     query products {
//     products {
//         _id
//         name
//         category {
//             name
//             id {
//                 _id
//                 name
//             }
//         }
//         brand {
//             name
//             id {
//                 _id
//                 name
//             }
//         }
//     }
//     }
// `