import { gql } from "@apollo/client";

export const GET_ORDERS_HISTORY_BY_CUSTOMER_ID = gql`
   query getOrdersByCustomerId {
        getOrdersByCustomerId {
            _id
            email
            phone
            address
            amount
            paymentStatus
            trxId
            orderStatus
            orderDate
            userId {
                _id
            }
            items {
                name
            }
        }
    }
`;