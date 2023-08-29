'use client'
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
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
    // states
    const [products, setProducts] = useState<StockCardTypes[] | []>([])
    const [randomProducts, setRandomProducts] = useState<StockCardTypes[] | []>([])

    // gql
    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY);


    // fill data into category state
    useEffect(() => {
        if (stocks?.data?.stocks) {
            setProducts(stocks?.data?.stocks)
        }
    }, [stocks?.data?.stocks])

    // making circular queue operation for picking random products
    useEffect(() => {
        if (products.length > 0) {
            let queue = new Array(12);
            let start = -1;
            let end = -1;
            let currentSize = 0;
            let n = products.length;

            const addProduct = (elem: any) => {
                if (currentSize < queue.length) {
                    if (start == -1 && end == -1) {
                        start = 0;
                        end = 0;
                    };

                    if (end == 12) {
                        end = 0;
                        queue[end] = elem;
                    } else {
                        queue[end] = elem;
                    };
                    end++;
                    currentSize++;
                };
            };

            let randomIndex = Math.floor(Math.random() * n);
            for (let i = randomIndex; i < n; i++) {
                if (currentSize < queue.length) {
                    addProduct(products[i]);

                    if (i == n - 1) {
                        i = -1;
                    }
                } else {
                    break;
                }
            };

            setRandomProducts(queue);
        };
    }, [products])

    return (
        <>
            {randomProducts.length > 0 ?
                randomProducts.map((stock: StockCardTypes) => (
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
    );
};

export default ProductView;