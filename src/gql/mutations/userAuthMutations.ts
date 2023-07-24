import { gql } from "@apollo/client"

export const USER_SIGN_UP_MUTATION = gql`
    mutation createUser($info:UserSignUpInputs!) {
        signUpUser(data:$info){
            status
            message
        }
    }
`;