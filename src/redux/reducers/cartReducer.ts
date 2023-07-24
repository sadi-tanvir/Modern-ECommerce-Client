import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
    cart: {},
} as any

// actions
const addToCart = createAction('addToCart');
const removeFromCart = createAction('removeFromCart');
const clearCart = createAction('clearCart');
const reloadCart = createAction('reloadCart');

const cartReducer = createReducer(initialState, (builder) => {
    // add product to the cart
    builder.addCase(addToCart, (state, action: { payload: any }) => {
        const { productId } = action.payload;
        let newCart: any = state.cart;

        if (productId in state.cart) {
            newCart[productId].qty = newCart[productId].qty + 1
        } else {
            newCart[productId] = { ...action.payload }
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    });

    // remove product or decrement product quantity from the cart
    builder.addCase(removeFromCart, (state, action: any) => {
        const newCart: any = state.cart;
        const { productId } = action.payload;
        if (productId in newCart) {
            newCart[productId]["qty"] = newCart[productId]["qty"] - 1
        }

        if (newCart[productId]["qty"] <= 0) {
            delete newCart[productId]
        }
        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    });

    // clear cart data
    builder.addCase(clearCart, (state, action: any) => {
        state.cart = {}
        localStorage.removeItem('cart')
        console.log('cart has been cleared')
    });

    // clear cart data
    builder.addCase(reloadCart, (state, action: any) => {
        state.cart = action.payload || {};
    });
});

export default cartReducer