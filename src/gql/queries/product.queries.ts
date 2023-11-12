import { gql } from "@apollo/client"

// hasn't been used yet
/* export const GET_STOCKS_FOR_DISPLAY = gql`
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
 */

export const GET_PRODUCTS_FOR_DETAILS_DISPLAY = gql`
query getProducts($page:Int, $size:Int, $filteredBy:FilteredData, $search: String) {
        getProducts (page:$page, size:$size, filteredBy: $filteredBy, search: $search){
            totalProductsCount
            products{
                _id
                name
                description
                price
                discount
                imageUrl
                status
                unit
                rating
                isTopSale
                quantity
                category {
                    name
                }
                brand {
                    name
                }
            }
        }
    }
`;

export const GET_PRODUCTS_FOR_ADMINISTRATOR = gql`
    query getProductsWithDetails ($page:Int, $size:Int) {
        getProductsWithDetails (page:$page, size:$size){
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

export const GET_PRODUCT_WITH_DETAILS_BY_ID = gql`
query getProductById($id: ID!) {
    productWithDetailsById(id: $id) {
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



export const GET_PRODUCTS_WITH_DETAILS_BY_CATEGORY = gql`
query getProductsByCategory($category: String!) {
    getProductsByCategory(category: $category) {
        _id
        name
        description
        price
        discount
        imageUrl
        status
        unit
        rating
        isTopSale
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