import { createReducer, createAction } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

export interface AuthReducerUserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    role: string;
    gender: string;
    currentAddress: string;
    permanentAddress: string;
    dateOfBirth: string;
    accountStatus: string;
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
        password: '',
        phone: '',
        image: '',
        role: '',
        gender: '',
        currentAddress: '',
        permanentAddress: '',
        dateOfBirth: '',
        accountStatus: '',
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
        state.userInfo.name = action.payload.name
        state.userInfo.email = action.payload.email
        state.userInfo.password = action.payload.password
        state.userInfo.phone = action.payload.phone
        state.userInfo.image = action.payload.image
        state.userInfo.role = action.payload.role
        state.userInfo.gender = action.payload.gender
        state.userInfo.currentAddress = action.payload.currentAddress
        state.userInfo.permanentAddress = action.payload.permanentAddress
        state.userInfo.dateOfBirth = action.payload.dateOfBirth
        state.userInfo.accountStatus = action.payload.accountStatus
    });

    builder.addCase(logOutUser, (state, action) => {
        // clear local storage
        localStorage.clear();

        // delete cookies
        deleteCookie("logged");

        // make redux store as initial state
        state.isAuthenticate = false;
        state.isAdmin = false;
        state.role = "";
        state.isUser = false;
        state.accessToken = "";
        state.userInfo = {
            _id: "",
            name: '',
            email: '',
            password: '',
            phone: '',
            image: '',
            role: '',
            gender: '',
            currentAddress: '',
            permanentAddress: '',
            dateOfBirth: '',
            accountStatus: '',
        };
    });

    // // Default case reducer
    // builder.addDefaultCase((state, action) => {
    //     // Do nothing
    // });
});

export default authReducer;