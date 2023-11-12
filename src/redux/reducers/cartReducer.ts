import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
    cart: {},
} as any

// actions
const addToCart = createAction('addToCart');
const removeFromCart = createAction('removeFromCart');
const decreaseQty = createAction('decreaseQty');
export const clearCart = createAction('clearCart');
const reloadCart = createAction('reloadCart');

const cartReducer = createReducer(initialState, (builder) => {
    // add product to the cart
    builder.addCase(addToCart, (state, action: { payload: any }) => {
        const { stockId } = action.payload;
        let newCart: any = state.cart;

        if (stockId in state.cart) {
            newCart[stockId].qty = newCart[stockId].qty + 1
        } else {
            newCart[stockId] = { ...action.payload }
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    });



    // decrement product quantity
    builder.addCase(decreaseQty, (state, action: any) => {
        const newCart: any = state.cart;
        const { stockId } = action.payload;
        if (stockId in newCart) {
            newCart[stockId]["qty"] = newCart[stockId]["qty"] - 1
        }

        if (newCart[stockId]["qty"] <= 0) {
            delete newCart[stockId]
        }
        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    });


    // remove product or decrement product quantity from the cart
    builder.addCase(removeFromCart, (state, action: any) => {
        const newCart: any = state.cart;
        const { stockId } = action.payload;
        if (stockId in newCart) {
            delete newCart[stockId]
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