import { useAppDispatch } from '@/redux/hooks/hooks';
import React from 'react';

type ProductCardTypes = {
    productId: string;
    imageSrc: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    discountOffer: number;
    isTopSale: boolean;
    isInStock: boolean;
};

const ProductCard = ({
    productId,
    imageSrc,
    productName,
    productDescription,
    productPrice,
    discountOffer,
    isTopSale,
    isInStock,
}: ProductCardTypes) => {

    // redux
    const dispatch = useAppDispatch()

    const handleAddToCart = ({ productId, productImage, name, price }: { productId: string; productImage: string; name: string; price: number }) => {
        dispatch({ type: 'addToCart', payload: { productImage, name, price, qty: 1, productId } })
    }

    // calculating product price
    const currentProductPrice = productPrice - ((productPrice * discountOffer) / 100)

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
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
                    <h3 className="text-xl font-semibold mb-2">{productName}</h3>
                    {isInStock ||
                        <span className="text-red-600 font-semibold">Out of Stock</span>
                    }
                </div>
                <p className="text-gray-600 mb-4">{productDescription}</p>
                <div className="flex items-center justify-between">

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
                    <div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg mr-2">
                            Details
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
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
