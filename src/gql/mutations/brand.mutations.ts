import { gql } from "@apollo/client";


export const CREATE_BRAND_MUTATION = gql`
    mutation createBrand($info:BrandInputData!) {
        createBrand(data:$info){
            status
            message
        }
    }
`;