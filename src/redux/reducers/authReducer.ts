import { createReducer, createAction } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

export interface AuthReducerOwnerType {
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
    ownerInfo: AuthReducerOwnerType;
};

const initialState = {
    isAuthenticate: false,
    role: "",
    isAdmin: false,
    isUser: false,
    accessToken: "",
    ownerInfo: {
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
const ownerRole = createAction('ownerRole');
const accessToken = createAction('accessToken');
const setOwnerInfo = createAction('setOwnerInfo');
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

    builder.addCase(ownerRole, (state, action) => {
        state.role = action.payload;
    });

    builder.addCase(accessToken, (state, action) => {
        state.accessToken = action.payload;
    });

    builder.addCase(setOwnerInfo, (state, action: any) => {
        state.ownerInfo._id = action.payload._id;
        state.ownerInfo.name = action.payload.name
        state.ownerInfo.email = action.payload.email
        state.ownerInfo.password = action.payload.password
        state.ownerInfo.phone = action.payload.phone
        state.ownerInfo.image = action.payload.image
        state.ownerInfo.role = action.payload.role
        state.ownerInfo.gender = action.payload.gender
        state.ownerInfo.currentAddress = action.payload.currentAddress
        state.ownerInfo.permanentAddress = action.payload.permanentAddress
        state.ownerInfo.dateOfBirth = action.payload.dateOfBirth
        state.ownerInfo.accountStatus = action.payload.accountStatus
    });

    builder.addCase(logOutUser, (state, action) => {
        // clear local storage
        localStorage.clear();

        // delete cookies
        deleteCookie("logged");
        deleteCookie("isAdmin");

        // make redux store as initial state
        state.isAuthenticate = false;
        state.isAdmin = false;
        state.role = "";
        state.isUser = false;
        state.accessToken = "";
        state.ownerInfo = {
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