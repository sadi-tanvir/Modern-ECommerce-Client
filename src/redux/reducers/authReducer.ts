import { createReducer, createAction } from '@reduxjs/toolkit';

export interface AuthReducerUserType {
    _id: string;
    name: string;
    phone?: string;
    email: string;
    gender?: string;
};

export interface AuthReducerStateType {
    isAuthenticate?: boolean;
    role?: string;
    isAdmin?: boolean;
    isUser?: boolean;
    accessToken?: string;
    userInfo: AuthReducerUserType;
};

const initialState = {
    isAuthenticate: false,
    role: "",
    isAdmin: false,
    isUser: false,
    accessToken: "",
    userInfo: {
        _id: "",
        name: '',
        email: '',
        phone: '',
        gender: '',
    },
} as AuthReducerStateType;

const loginUser = createAction('loginUser');
const accessAdmin = createAction('accessAdmin');
const accessUser = createAction('accessUser');
const userRole = createAction('userRole');
const accessToken = createAction('accessToken');
const setUserInfo = createAction('setUserInfo');
const logOutUser = createAction('logOutUser');

const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginUser, (state, action) => {
        state.isAuthenticate = true
    });

    builder.addCase(accessAdmin, (state, action) => {
        state.isAdmin = true
    });

    builder.addCase(accessUser, (state, action) => {
        state.isUser = true;
    });

    builder.addCase(userRole, (state, action) => {
        state.role = action.payload;
    });

    builder.addCase(accessToken, (state, action) => {
        state.accessToken = action.payload;
    });

    builder.addCase(setUserInfo, (state, action: any) => {
        state.userInfo._id = action.payload._id;
        state.userInfo.name = action.payload.name;
        state.userInfo.phone = action.payload.phone;
        state.userInfo.email = action.payload.email;
        state.userInfo.gender = action.payload.gender;
    });

    builder.addCase(logOutUser, (state, action) => {
        state.isAuthenticate = false;
        state.isAdmin = false;
        state.role = "";
        state.isUser = false;
        state.accessToken = "";
        state.userInfo = {
            _id: "",
            name: '',
            phone: '',
            email: '',
            gender: '',
        };
    });

    // // Default case reducer
    // builder.addDefaultCase((state, action) => {
    //     // Do nothing
    // });
});

export default authReducer;