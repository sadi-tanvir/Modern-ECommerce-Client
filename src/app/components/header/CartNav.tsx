import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/navigation'
import React from 'react'

const CartNav = () => {
    const router = useRouter();

    // redux
    const { cart } = useAppSelector(state => state.cartReducer);
    const cartItems = Object.keys(cart);


    return (
        <div onClick={() => router.push('/cart')} className="relative cursor-pointer mb-5 lg:mb-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-9 h-9"
            >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.5 12h13"></path>
                <circle cx="8.5" cy="7" r="2"></circle>
                <circle cx="18" cy="7" r="2"></circle>
            </svg>
            {5 > 0 && (
                <div className="absolute top-0 left-5 lg:right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                </div>
            )}
        </div>
    )
}

export default CartNav