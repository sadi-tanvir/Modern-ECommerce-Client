import { gql } from "@apollo/client";


export const CREATE_CATEGORY_MUTATION = gql`
    mutation createCategory($info:CategoryInputData!) {
        createCategory(data:$info){
            status
            message
        }
    }
`;

export const UPDATE_CATEGORY_BY_ID_MUTATION = gql`
    mutation updateCategoryById($id: ID!, $info: CategoryInputData!) {
        updateCategoryById(id: $id, data: $info) {
            status
            message
        }
    }
`;

export const DELETE_CATEGORY_BY_ID_MUTATION = gql`
    mutation deleteCategoryById($id: ID!) {
        deleteCategoryById(id: $id) {
            status
            message
        }
    }
`;