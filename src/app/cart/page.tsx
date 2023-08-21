'use client'
import React, { useEffect, useState } from 'react';
import { DelIcon, MinusIcon, PlusIcon } from '../components/shared/Icon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import Image from 'next/image';

type CartItem = {
  productId: string;
  productImage: string;
  name: string;
  price: number;
  qty: number;
};


const CartPage: React.FC= () => {
  const [totalPrice, setTotalPrice] = useState(0);


  // redux
  const dispatch = useAppDispatch()
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


  const increaseItem = ({ productId, name, price }: { productId: string; name: string; price: number }) => {
    dispatch({ type: 'addToCart', payload: { name, price, qty: 1, productId } })
  };

  const decreaseItem = (productId: string) => {
    dispatch({ type: 'decreaseQty', payload: { productId } })
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'removeFromCart', payload: { productId } })
  };

  return (
    <div className="container mx-auto mt-8 px-5">
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-xl text-center mt-40">Your cart is empty.</p>
      ) : (
        <div className='pb-5'>
          <h2 className="text-3xl font-bold mb-4">Cart Items</h2>
          {Object.values(cart).map((item: unknown) => {
            const cartItem = item as CartItem;
            return (
              <div key={cartItem.productId} className="flex items-center justify-between border-b border-gray-300 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg flex justify-center items-center">
                    <Image
                      src={cartItem.productImage}
                      width={64}
                      height={64}
                      alt="Picture of the author"
                      className='rounded-full'
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{cartItem.name}</h3>
                    <p className="text-gray-600 text-lg">Price: ৳{cartItem.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseItem(cartItem.productId)}
                    className="text-2xl text-blue-600 focus:outline-none bg-red-500 px-2 rounded"
                  >
                    <MinusIcon />
                  </button>
                  <span className="font-semibold text-2xl mx-3">{cartItem.qty}</span>
                  <button
                    onClick={() => increaseItem({ productId: cartItem.productId, name: cartItem.name, price: cartItem.price })}
                    className="text-2xl text-blue-600 focus:outline-none bg-primary px-2 rounded"
                  >
                    <PlusIcon />
                  </button>
                  <button
                    onClick={() => removeItem(cartItem.productId)}
                    className="text-red-600 text-xl ml-6 focus:outline-none"
                  >
                    <DelIcon />
                  </button>
                </div>
              </div>
            )
          })}
          <div className="border-t border-gray-200 mt-8">
            <h3 className="text-2xl font-semibold mb-4">Product Summary</h3>
            <p className="text-gray-600 text-lg mb-4">delivery fee: ৳{deliveryFee}</p>
            <p className="text-primary text-lg mb-4">discount: ৳{discount}</p>
            <p className="text-gray-600 text-lg mb-4">Total: ৳{(totalPrice + deliveryFee) - discount}</p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
