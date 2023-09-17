'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks/hooks';
import Summary from './Summary';
import CheckoutForm from './CheckoutForm';

const CheckoutLayout = () => {
    // states
    const [subTotalPrice, setTotalPrice] = useState<number>(0);

    // redux
    const { cart } = useAppSelector(state => state.cartReducer);

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
    
    return (
        <>
            <Summary
                deliveryFee={deliveryFee}
                discount={discount}
                subTotalAmount={subTotalPrice}
            />
            <CheckoutForm
                subTotalPrice={subTotalPrice}
                deliveryFee={deliveryFee}
                discount={discount}
            />
        </>
    )
}

export default CheckoutLayout