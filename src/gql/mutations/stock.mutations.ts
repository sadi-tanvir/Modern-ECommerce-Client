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


export const UPDATE_STOCK_MUTATION = gql`
     mutation updateStockById($id:ID!, $info:StockUpdateInputData!) {
        updateStockById(id:$id, data:$info){
            status
            message
        }
    }
`;

export const DELETE_STOCK_MUTATION = gql`
    mutation deleteStockById($id:ID!) {
        deleteStockById(id:$id){
            status
            message
        }
    }
`;