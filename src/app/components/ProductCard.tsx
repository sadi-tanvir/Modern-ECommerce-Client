import { useAppDispatch } from '@/redux/hooks/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type ProductCardTypes = {
    productId: string;
    imageSrc: string;
    productName: string;
    productPrice: number;
    discountOffer: number;
    isTopSale?: boolean;
    isInStock: boolean;
};

const ProductCard = ({
    productId,
    imageSrc,
    productName,
    productPrice,
    discountOffer,
    isTopSale,
    isInStock,
}: ProductCardTypes) => {
    const [fullName, setFullName] = useState(false)

    // redux
    const dispatch = useAppDispatch()

    // router
    const router = useRouter();

    // add product into the cart
    const handleAddToCart = ({ productId, productImage, name, price }: { productId: string; productImage: string; name: string; price: number }) => {
        dispatch({ type: 'addToCart', payload: { productImage, name, price, qty: 1, productId } })
    }

    // calculating product price
    const currentProductPrice = productPrice - ((productPrice * discountOffer) / 100)

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
                                <h3 className="text-xl font-semibold mb-2">{productName.slice(0, fullName ? productName.length : 30)}...
                                    <span onClick={() => setFullName(!fullName)} className='text-sm text-primary cursor-pointer'>
                                        {fullName ? 'less' : 'more'}
                                    </span>
                                </h3>
                            </>
                            :
                            <h3 className="text-xl font-semibold mb-2">{productName}</h3>
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
                                <span className="text-red-500 font-bold ml-1">{discountOffer}% off</span>
                            </>
                        )}
                    </div>
                    <span className="text-lg font-semibold flex justify-center items-center">
                        ৳ {currentProductPrice}
                    </span>
                </div>
                <div className='mt-10'>
                    <div className='w-full flex gap-1 absolute bottom-3 left-0 px-2'>
                        <button onClick={() => router.push(`/stock/${productId}`)} className="w-full bg-primary text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg mr-2">
                            Details
                        </button>
                        <button
                            className="w-full bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-400"
                            disabled={!isInStock}
                            onClick={() => handleAddToCart({
                                productImage: imageSrc,
                                productId: productId,
                                name: productName,
                                price: currentProductPrice
                            })}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
