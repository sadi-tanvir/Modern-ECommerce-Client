'use client'
import ProductDetailsViewShimmerEffect from '@/app/components/Shimmer-Effect/ProductDetailsViewShimmerEffect';
import Button from '@/app/components/shared/Button';
import Loader from '@/app/components/shared/Loader';
import { GET_PRODUCT_WITH_DETAILS_BY_ID } from '@/gql/queries/product.queries';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';



// AdminStockDetailsType
const ProductDetails = ({ params }: any) => {
    const [stockDetails, setStockDetails] = useState({})

    // navigation
    const router = useRouter()


    // redux
    const dispatch = useAppDispatch()


    // gql
    const { loading, error, data, refetch } = useQuery(GET_PRODUCT_WITH_DETAILS_BY_ID, {
        variables: {
            id: params.stockId
        }
    });
    // const { _id, name, description, unit, status, imageUrl, price, discount, quantity, sellCount, category, brand } = data?.productWithDetailsById




    // add product into the cart
    const handleAddToCart = ({ stockId, imageUrl, name, price }: { stockId: string; imageUrl: string; name: string; price: number }) => {
        dispatch({ type: 'addToCart', payload: { imageUrl, name, price: Math.round(price), qty: 1, stockId } })
    }



    // calculating product price
    const currentProductPrice = data?.productWithDetailsById?.price - ((data?.productWithDetailsById?.price * data?.productWithDetailsById?.discount) / 100)

    return (
        <>
            {
                data?.productWithDetailsById ?
                    <>
                        <div className="w-screen min-h-screen bg-backgroundColor  text-secondary">
                            <div className=" pt-10 container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <img src={data.productWithDetailsById.imageUrl} alt={data.productWithDetailsById.name} className="w-full h-64 object-cover rounded-lg" />
                                    </div>
                                    <div className='px-2'>
                                        <h2 className="text-2xl font-bold mb-4">{data.productWithDetailsById.name}</h2>
                                        <div className="mb-4">
                                            <span className="text-lg font-semibold">Price: </span>
                                            {data.productWithDetailsById.discount > 0 ? (
                                                <>
                                                    <span className="text-red line-through mr-2">৳{data.productWithDetailsById.price}</span>
                                                    <span className="text-success font-semibold">৳{currentProductPrice}</span>
                                                    <span className="text-red font-bold ml-2">({data.productWithDetailsById.discount}% off)</span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-semibold">৳{data.productWithDetailsById.price}</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-4">{data.productWithDetailsById.description}</p>
                                        <div className="flex items-center mb-4">
                                            {data.productWithDetailsById.status === 'in-stock' ? (
                                                <span className="text-success font-semibold">In Stock</span>
                                            ) : (
                                                <span className="text-danger font-semibold">Out of Stock</span>
                                            )}
                                        </div>
                                        <p className="mb-2">Product ID: {data.productWithDetailsById._id}</p>
                                        <p className="mb-2">Available Quantity: {data.productWithDetailsById.quantity}{data.productWithDetailsById.unit}</p>
                                        <p className="mb-2">Total Sold: {data.productWithDetailsById.sellCount}{data.productWithDetailsById.unit}</p>
                                        <p className="mb-2">Category: {data.productWithDetailsById.category?.id?.name}</p>
                                        <p>Brand: {data.productWithDetailsById.brand?.id?.name}</p>
                                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                            <Button
                                                onClick={() => router.push(`/admin/manage-stocks/update-stock?stockId=${data.productWithDetailsById._id}`)}
                                                buttonClass='w-full lg:w-52 bg-danger'
                                            >
                                                edit
                                            </Button>
                                            <Button onClick={() => router.push("/admin/manage-stocks")} buttonClass='w-full lg:w-52 bg-primary'>
                                                Back to Stock List
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