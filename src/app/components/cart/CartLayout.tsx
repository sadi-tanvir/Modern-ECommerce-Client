'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { DelIcon, MinusIcon, PlusIcon } from '../shared/Icon';
import { useRouter } from 'next/navigation';
import Button from '../shared/Button';
import { warningAlert } from '../alert-functions/alert';

type CartItem = {
    stockId: string;
    imageUrl: string;
    name: string;
    price: number;
    qty: number;
};

type IncreaseItemType = {
    stockId: string;
    name: string;
    price: number
}

const CartLayout = () => {
    // states
    const [totalPrice, setTotalPrice] = useState(0);


    // redux
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(state => state.cartReducer);


    // navigation
    const router = useRouter()


    const cartItems = Object.keys(cart);
    const deliveryFee = 20;
    const discount = 10;


    useEffect(() => {
        // calculating total price
        const sub = cartItems.map((k) => {
            return cart[k].qty * cart[k].price
        })

        setTotalPrice(sub.reduce((pre, curr) => pre + curr, 0))
    }, [cart])



    // increase product quantity
    const increaseItem = ({ stockId, name, price }: IncreaseItemType) => dispatch({ type: 'addToCart', payload: { name, price: Math.round(price), qty: 1, stockId } });


    // decrease product quantity
    const decreaseItem = (stockId: string) => dispatch({ type: 'decreaseQty', payload: { stockId } });


    // remove product from cart
    const removeItem = (stockId: string) => dispatch({ type: 'removeFromCart', payload: { stockId } });

    // clear cart data
    const handleClearCart = () => warningAlert('Yes, Create it!', () => (dispatch({ type: 'clearCart' })));

    return (
        <>
            {cartItems.length === 0 ? (
                <p className="text-secondary text-xl text-center mt-40">Your cart is empty.</p>
            ) : (
                <div className='pb-5'>
                    <h2 className="text-3xl font-bold mb-4 text-secondary">Cart Items</h2>
                    {Object.values(cart).map((item: unknown) => {
                        const cartItem = item as CartItem;
                        return (
                            <div key={cartItem.stockId} className="flex items-center justify-between border-b border-gray-300 py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-lg flex justify-center items-center">
                                        <Image
                                            src={cartItem.imageUrl}
                                            width={64}
                                            height={64}
                                            alt="Picture of the author"
                                            className='rounded-full'
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-secondary">{cartItem.name}</h3>
                                        <p className="text-secondary text-lg">Price:
                                            <span className='text-success ml-2'>৳{cartItem.price}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => decreaseItem(cartItem.stockId)}
                                        className="text-2xl text-blue-600 focus:outline-none bg-red-500 px-2 rounded"
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="font-semibold text-2xl mx-3 text-secondary">{cartItem.qty}</span>
                                    <button
                                        onClick={() => increaseItem({ stockId: cartItem.stockId, name: cartItem.name, price: cartItem.price })}
                                        className="text-2xl text-blue-600 focus:outline-none bg-primary px-2 rounded"
                                    >
                                        <PlusIcon />
                                    </button>
                                    <button
                                        onClick={() => removeItem(cartItem.stockId)}
                                        className="text-red-600 text-xl ml-6 focus:outline-none"
                                    >
                                        <DelIcon />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <div className="border-t border-gray-200 mt-8">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-secondary">Order Summary</h3>
                            {/* Display the items in the order with their prices */}
                            <div className="flex justify-between mb-2  text-secondary">
                                <span>Subtotal:</span>
                                <span>৳{totalPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2  text-secondary">
                                <span>Delivery Fee:</span>
                                <span>৳{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between mb-2  text-secondary">
                                <span>Discount:</span>
                                <span className='text-danger'>-৳{discount}</span>
                            </div>
                            <hr className="border-t my-2" />
                            <div className="flex justify-between  text-secondary">
                                <span className='font-bold'>Total:</span>
                                <span className='text-success'>৳{(totalPrice + deliveryFee) - discount}</span>
                            </div>
                        </div>

                        <div className='w-full flex justify-center lg:justify-start gap-5 items-center'>
                            <Button onClick={handleClearCart} buttonClass="bg-red-500 w-full lg:w-72" boxShadowColor='#dc2626'>
                                Clear Cart
                            </Button>
                            <Button onClick={() => router.push('/cart/checkout')} buttonClass="bg-primary w-full lg:w-72" boxShadowColor='#35af00'>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default CartLayout