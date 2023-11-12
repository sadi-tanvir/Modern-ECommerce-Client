'use client'
import { GET_PRODUCTS_FOR_DETAILS_DISPLAY } from '@/gql/queries/product.queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import ProductCard from '../../product-card/ProductCard';
import ProductCardShimmerEffect from '../../Shimmer-Effect/ProductCardShimmerEffect';

type ProductCardTypes = {
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
    const [randomProducts, setRandomProducts] = useState<ProductCardTypes[] | []>([])

    // gql
    const products = useQuery(GET_PRODUCTS_FOR_DETAILS_DISPLAY);


    // making circular queue operation for picking random products
    useEffect(() => {
        if (products?.data?.getProducts?.products?.length > 0) {
            let queue = new Array(12);
            let start = -1;
            let end = -1;
            let currentSize = 0;
            let n = products.data.getProducts.products.length;

            const addProduct = (elem: ProductCardTypes) => {
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
                    addProduct(products.data.getProducts.products[i]);

                    if (i == n - 1) {
                        i = -1;
                    }
                } else {
                    break;
                }
            };

            setRandomProducts(queue);
        };
    }, [products?.data?.getProducts?.products])

    return (
        <>
            {randomProducts.length > 0 ?
                randomProducts.map((product: ProductCardTypes) => (
                    <ProductCard
                        stockId={product._id}
                        imageSrc={product.imageUrl}
                        isTopSale={product.isTopSale}
                        rating={product.rating}
                        productPrice={product.price}
                        discountOffer={product.discount}
                        productName={product.name}
                        key={product._id}
                        isInStock={product.status === 'in-stock' ? true : false}
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