import { gql } from "@apollo/client";


export const CREATE_PRODUCT_MUTATION = gql`
    mutation createProduct($info:ProductInputs!) {
        createProduct(data:$info){
            status
            message
        }
    }
`;