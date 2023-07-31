import { gql } from "@apollo/client";


export const CREATE_STOCK_MUTATION = gql`
    mutation createStock($info:StockInputData!) {
        createStock(data:$info){
            status
            message
            stock{
                name
                description
                price
            }
        }
    }
`;