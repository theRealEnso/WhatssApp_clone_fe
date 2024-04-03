import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const AUTH_ENDPOINT = `${import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT}/auth`;

type User = {
    firstName: string;
    lastName: string;
    email: string;
    picture?: string;
    status?: string;
    access_token: string;
};

type UserState = {
    status: string;
    error: string;
    user: User
}

const USER_INITIAL_STATE: UserState = {
   status: "",
   error: "",
   user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    status: "",
    access_token: "",
   } 
}

export const userReducer = createSlice({
    name: "users",
    initialState: USER_INITIAL_STATE,
    reducers: {
        logout: (state, action) => {
            state.status = "",
            state.error = "",
            state.user = {
                firstName: "",
                lastName: "",
                email: "",
                picture: "",
                status: "",
                access_token: "",
            }
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
            state.status = "loading"
            state.error = "";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.user = action.payload.user; // server sends back a response object  that contains a nested user object
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.user = action.payload.user; // server sends back a response object that contains a nested user object
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },
});

export const {logout} = userReducer.actions;

export const registerUser = createAsyncThunk("auth/register", async (payloadData, {rejectWithValue}) => {
    try {
        // const response = await axios.post(`${AUTH_ENDPOINT}/register`, payloadData);
        // console.log(response);
        const {data} = await axios.post(`${AUTH_ENDPOINT}/register`, payloadData);
        return data;
    } catch(error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (payloadData, {rejectWithValue}) => {
    try {
        // const response = await axios.post(`${AUTH_ENDPOINT}/login`, payloadData);
        // console.log(response);
        const {data} = await axios.post(`${AUTH_ENDPOINT}/login`, payloadData)
        return data;
    } catch(error) {
        rejectWithValue(error);
    }
});

export default userReducer.reducer;