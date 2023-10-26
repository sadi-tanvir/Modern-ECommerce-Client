'use client'
import ProductDetailsViewShimmerEffect from '@/app/components/Shimmer-Effect/ProductDetailsViewShimmerEffect';
import Button from '@/app/components/shared/Button';
import { GET_STOCK_WITH_DETAILS_BY_ID } from '@/gql/queries/stock.queries';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



// AdminStockDetailsType
const ProductDetails = ({ params }: any) => {
    const [stockDetails, setStockDetails] = useState({})

    // navigation
    const router = useRouter()


    // redux
    const dispatch = useAppDispatch()


    // gql
    const { loading, error, data, refetch } = useQuery(GET_STOCK_WITH_DETAILS_BY_ID, {
        variables: {
            id: params.stockId
        }
    });
    // const { _id, name, description, unit, status, imageUrl, price, discount, quantity, sellCount, category, brand } = data?.stockWithDetailsById




    // add product into the cart
    const handleAddToCart = ({ stockId, imageUrl, name, price }: { stockId: string; imageUrl: string; name: string; price: number }) => {
        dispatch({ type: 'addToCart', payload: { imageUrl, name, price: Math.round(price), qty: 1, stockId } })
    }



    // calculating product price
    const currentProductPrice = data?.stockWithDetailsById?.price - ((data?.stockWithDetailsById?.price * data?.stockWithDetailsById?.discount) / 100)

    return (
        <>
            {
                data?.stockWithDetailsById ?
                    <>
                        <div className="w-screen min-h-screen bg-backgroundColor">
                            <div className="container mx-auto pt-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <img src={data.stockWithDetailsById.imageUrl} alt={data.stockWithDetailsById.name} className="w-full h-64 object-cover rounded-lg" />
                                    </div>
                                    <div className='px-2'>
                                        <h2 className="text-2xl font-bold mb-4 text-secondary">{data.stockWithDetailsById.name}</h2>
                                        <div className="mb-4">
                                            <span className="text-lg font-semibold text-secondary">Price: </span>
                                            {data.stockWithDetailsById.discount > 0 ? (
                                                <>
                                                    <span className="text-danger line-through mr-2">৳{data.stockWithDetailsById.price}</span>
                                                    <span className="text-success font-semibold">৳{currentProductPrice}</span>
                                                    <span className="font-bold ml-2 text-danger">({data.stockWithDetailsById.discount}% off)</span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-semibold text-success">৳{data.stockWithDetailsById.price}</span>
                                            )}
                                        </div>
                                        <p className="text-secondary mb-4">{data.stockWithDetailsById.description}</p>
                                        <div className="flex items-center mb-4">
                                            {data.stockWithDetailsById.status === 'in-stock' ? (
                                                <span className="text-success font-semibold">In Stock</span>
                                            ) : (
                                                <span className="text-danger font-semibold">Out of Stock</span>
                                            )}
                                        </div>
                                        <p className="mb-2 text-secondary">Product ID: {data.stockWithDetailsById._id}</p>
                                        <p className="mb-2 text-secondary">Available Quantity: {data.stockWithDetailsById.quantity}{data.stockWithDetailsById.unit}</p>
                                        <p className="mb-2 text-secondary">Total Sold: {data.stockWithDetailsById.sellCount}{data.stockWithDetailsById.unit}</p>
                                        <p className="mb-2 text-secondary">Category: {data.stockWithDetailsById.category?.id?.name}</p>
                                        <p className="mb-2 text-secondary">Brand: {data.stockWithDetailsById.brand?.id?.name}</p>
                                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                            <Button onClick={() => router.push("/stocks")} buttonClass='w-full md:w-48 bg-danger'>
                                                Back to products List
                                            </Button>
                                            <Button
                                                onClick={() => handleAddToCart({
                                                    imageUrl: data.stockWithDetailsById.imageUrl,
                                                    stockId: data.stockWithDetailsById._id,
                                                    name: data.stockWithDetailsById.name,
                                                    price: currentProductPrice
                                                })}
                                                buttonClass='w-full md:w-48 bg-primary'
                                            >
                                                Add To Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <ProductDetailsViewShimmerEffect />
                    </>
            }
        </>
    );
};

export default ProductDetails;
