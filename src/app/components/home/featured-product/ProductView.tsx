'use client'
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import { useQuery } from '@apollo/client';
import React from 'react'
import ProductCard from '../../product-card/ProductCard';
import ProductCardShimmerEffect from '../../Shimmer-Effect/ProductCardShimmerEffect';

type StockCardTypes = {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrl: string;
    status: string;
    unit: string;
    quantity: number;
    rating: number;
    isTopSale: boolean;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
};

const ProductView = () => {
    // gql
    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY);

    return (
        <>
            {stocks?.data?.stocks?.length > 0 ?
                stocks?.data?.stocks.slice(0, 12).map((stock: StockCardTypes) => (
                    <ProductCard
                        productId={stock._id}
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
                [...Array(8)].map((elem, index) => (
                    <ProductCardShimmerEffect key={index} />
                ))
            }
        </>
    )
}

export default ProductView