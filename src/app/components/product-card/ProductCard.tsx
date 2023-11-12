'use client'
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Button from '../shared/Button';

type ProductCardTypes = {
    stockId: string;
    imageSrc: string;
    productName: string;
    productPrice: number;
    discountOffer: number;
    isInStock: boolean;
    isTopSale: boolean;
    rating: number;
};

const ProductCard = ({
    stockId,
    imageSrc,
    productName,
    productPrice,
    discountOffer,
    isTopSale,
    isInStock,
    rating,
}: ProductCardTypes) => {
    const [fullName, setFullName] = useState(false)

    // redux
    const dispatch = useAppDispatch()

    // router
    const router = useRouter();

    // add product into the cart
    const handleAddToCart = ({ stockId, imageUrl, name, price }: { stockId: string; imageUrl: string; name: string; price: number }) => {
        dispatch({ type: 'addToCart', payload: { imageUrl, name, price: Math.round(price), qty: 1, stockId } })
    }

    // calculating product price
    const currentProductPrice = productPrice - ((productPrice * discountOffer) / 100)

    let val = 2;

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 relative">
            <div className="relative">
                {isTopSale && (
                    <span className="absolute top-0 left-0 bg-red-500 text-white font-bold px-2 py-1 rounded-md">
                        Top Sale
                    </span>
                )}
                <img src={imageSrc} alt={productName} className="w-full h-48 object-cover rounded-t-lg" />
            </div>
            <div className="p-4">
                <div className='flex flex-row justify-between'>
                    {
                        productName.length > 30 ?
                            <>
                                <h3 className="text-xl font-semibold mb-2 text-secondary">{productName.slice(0, fullName ? productName.length : 30)}...
                                    <span onClick={() => setFullName(!fullName)} className='text-sm text-primary cursor-pointer'>
                                        {fullName ? 'less' : 'more'}
                                    </span>
                                </h3>
                            </>
                            :
                            <h3 className="text-xl font-semibold mb-2 text-secondary">{productName}</h3>
                    }
                    {isInStock ||
                        <span className="text-red-600 font-semibold">Out of Stock</span>
                    }
                </div>
                {/* <div className="flex items-center justify-between"> */}
                <div className='flex flex-col justify-center items-start'>
                    <div className='flex'>
                        {discountOffer > 0 && (
                            <>
                                <span className="text-md text-slate-400 line-through flex justify-center items-center">
                                    ৳ {productPrice}
                                </span>
                                <span className="text-danger font-bold ml-1">{discountOffer}% off</span>
                            </>
                        )}
                    </div>
                    <span className="text-lg font-semibold flex justify-center items-center text-secondary">
                        ৳ {currentProductPrice}
                    </span>
                </div>
                <div className="rating mb-2">
                    <input className={`${rating >= 1 ? "mask bg-orange-500" : "bg-slate-300 mask"}  mask-star`} />
                    <input className={`${rating >= 2 ? "mask bg-orange-500" : "bg-slate-300 mask"}  mask-star`} />
                    <input className={`${rating >= 3 ? "mask bg-orange-500" : "bg-slate-300 mask"}  mask-star`} />
                    <input className={`${rating >= 4 ? "mask bg-orange-500" : "bg-slate-300 mask"}  mask-star`} />
                    <input className={`${rating >= 5 ? "mask bg-orange-500" : "bg-slate-300 mask"}  mask-star`} />
                </div>
                <div className='mt-10'>
                    <div className='w-full flex gap-1 absolute bottom-3 left-0 px-2'>
                        <Button onClick={() => router.push(`/stocks/${stockId}`)} buttonClass='bg-[#99f6e4] text-[#14b8a6] w-full '>
                            Details
                        </Button>
                        <Button
                            disabled={!isInStock}
                            onClick={() => handleAddToCart({
                                imageUrl: imageSrc,
                                stockId: stockId,
                                name: productName,
                                price: currentProductPrice
                            })}
                            buttonClass='bg-[#bbf7d0] text-primary w-full disabled:cursor-not-allowed disabled:bg-slate-400'
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
