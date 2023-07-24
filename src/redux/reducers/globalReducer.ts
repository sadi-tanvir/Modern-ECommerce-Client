import { createReducer, createAction } from '@reduxjs/toolkit';


export interface AuthReducerStateType {
    isCustomerUpdate?: boolean;
    isOrderUpdate?: boolean;
    isProductUpdate?: boolean;
};

const initialState = {
    isCustomerUpdate: false,
    isOrderUpdate: false,
    isProductUpdate: false,
} as AuthReducerStateType;

// actions
const customerUpdate = createAction('customerUpdate');
const orderUpdate = createAction('orderUpdate');
const productUpdate = createAction('productUpdate');

const globalReducer = createReducer(initialState, (builder) => {
    builder.addCase(customerUpdate, (state, action) => {
        state.isCustomerUpdate = !state.isCustomerUpdate
    });

    builder.addCase(orderUpdate, (state, action) => {
        state.isOrderUpdate = !state.isOrderUpdate
    });

    builder.addCase(productUpdate, (state, action) => {
        state.isProductUpdate = !state.isProductUpdate
    });
});

export default globalReducer;