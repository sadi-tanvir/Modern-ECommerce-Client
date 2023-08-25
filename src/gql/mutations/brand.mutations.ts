import { gql } from "@apollo/client";


export const CREATE_BRAND_MUTATION = gql`
    mutation createBrand($info:BrandInputData!) {
        createBrand(data:$info){
            status
            message
        }
    }
`;

export const UPDATE_BRAND_BY_ID_MUTATION = gql`
    mutation updateBrandById($id: ID!, $info: BrandUpdateInputData!) {
        updateBrandById(id: $id, data: $info) {
            status
            message
    }
}
`;

export const DELETE_BRAND_BY_ID_MUTATION = gql`
    mutation deleteBrandById($id: ID!) {
        deleteBrandById(id: $id) {
            status
            message
        }
    }
`;