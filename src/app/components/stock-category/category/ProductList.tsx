import React from 'react'
import { StockCardTypes } from './StockCategoryLayout'
import ProductCard from '../../product-card/ProductCard'
import ProductCardShimmerEffect from '../../Shimmer-Effect/ProductCardShimmerEffect'

const ProductList = ({ filteredStocks }: { filteredStocks: StockCardTypes[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-10">
            {filteredStocks?.length > 0 ?
                filteredStocks?.map((stock: StockCardTypes) => (
                    <ProductCard
                        stockId={stock._id}
                        imageSrc={stock.imageUrl}
                        isTopSale={stock.isTopSale}
                        rating={stock.rating}
                        productPrice={stock.price}
                        discountOffer={stock.discount}
                        productName={stock.name}
                        key={stock._id}
                        isInStock={stock.status === 'in-stock' ? true : false}
                    />
                ))
                :
                [...Array(10)].map((elem, index) => (<ProductCardShimmerEffect key={index} />))
            }
        </div>
    )
}

export default ProductList