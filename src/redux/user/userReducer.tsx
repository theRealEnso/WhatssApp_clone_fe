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
    message: string;
    user: User
}

const USER_INITIAL_STATE: UserState = {
   status: "",
   error: "",
   message: "",
   user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    status: "",
    access_token: "",
   } 
};

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
        console.log(error)
        rejectWithValue(error.response.data.error.message);
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (payloadData, {rejectWithValue}) => {
    try {
        const {access_token} = payloadData;

        const {data} = await axios.post(`${AUTH_ENDPOINT}/logout`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });

        return data;

    } catch(error){
        rejectWithValue(error.response.data.error.message)
    }
})

export const userSlice = createSlice({
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
        .addCase(logoutUser.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.message = action.payload;
            state.user = {
                firstName: "",
                lastName: "",
                email: "",
                picture: "",
                status: "",
                access_token: "",
            };
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },
});

export const {logout} = userSlice.actions;

export const userReducer = userSlice.reducer;