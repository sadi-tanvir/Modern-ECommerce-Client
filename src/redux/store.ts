import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import globalReducer from './reducers/globalReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
    reducer: {
        authReducer,
        cartReducer,
        globalReducer
    },
    devTools: composeWithDevTools() as any,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
