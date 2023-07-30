import { gql } from "@apollo/client";


export const CREATE_CATEGORY_MUTATION = gql`
    mutation createCategory($info:CategoryInputData!) {
        createCategory(data:$info){
            status
            message
        }
    }
`;