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
        }
    }
`;

// hasn't been used yet
export const GET_STOCKS_FOR_DETAILS_DISPLAY = gql`
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

export const GET_STOCKS_FOR_ADMINISTRATOR = gql`
    query getStocksWithDetails {
        getStocksWithDetails {
            _id
            name
            description
            unit
            status
            imageUrl
            price
            discount
            quantity
            sellCount
            category {
                id{
                    _id
                    name
                }
            }
            brand {
                id{
                    _id
                    name
                }
            }
        }
    }
`;

export const GET_STOCK_WITH_DETAILS_BY_ID = gql`
query getStockById($id: ID!) {
    stockWithDetailsById(id: $id) {
        _id
            name
            description
            unit
            status
            imageUrl
            price
            discount
            quantity
            sellCount
            category {
                id{
                    _id
                    name
                }
            }
            brand {
                id{
                    _id
                    name
                }
            }
        }
    }
`;