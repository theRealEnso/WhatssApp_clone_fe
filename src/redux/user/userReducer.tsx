import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiClient } from "../store";

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

//create an action creator named registerUser using createAsyncThunk
//1st parameter is a string representing the type of action => follows convention of `domain/action` where `domain` is the namespace for your actions, and `action` is the specific action being performed
//2nd parameter is a payloadCreator. This is an async callback function that returns a promise. Receives two args:
//  - a payload passed when the action is dispatched, which contains data needed for the async operation. Named it `payloadData` here. Ex: in our register form component, we use redux to dispatch this `registerUser` action with the data object from react-hook-forms that contains the data that the user types into the form (this data object is passed as the payload)
// - thunkAPI object containing utility functions for handling async errors => `rejectWithValue` is used to reject the promise with a specific value, which will be captured as the payload of the `rejected` action. Also contains other utility functions like `dispatch` and `getState`
// always generates three standard action creators `pending`, `fulfilled`, and `rejected`

export const registerUser = createAsyncThunk("auth/register", async (payloadData, {rejectWithValue}) => {
    try {
        // const response = await axios.post(`${AUTH_ENDPOINT}/register`, payloadData);
        // console.log(response);
        const {data} = await apiClient.post(`${AUTH_ENDPOINT}/register`, payloadData); // post request to the `register' backend endpoint with the payload from our frontend form
        return data; //response that our backend endpoint sends back upon successful completion of post request, which is a payload object containing our user data
    } catch(error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (payloadData, {rejectWithValue}) => {
    try {
        // const response = await axios.post(`${AUTH_ENDPOINT}/login`, payloadData);
        // console.log(response);
        const {data} = await apiClient.post(`${AUTH_ENDPOINT}/login`, payloadData);

        return data;

    } catch(error) {
        console.log(error)
        return rejectWithValue(error.response.data.error.message);
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (payloadData, {rejectWithValue}) => {
    try {
        const {access_token} = payloadData;

        const {data} = await apiClient.post(`${AUTH_ENDPOINT}/logout`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });

        return data;

    } catch(error){
        return rejectWithValue(error.response.data.error.message)
    }
});

export const refreshAccessToken = createAsyncThunk("auth/refreshToken", async (_, {rejectWithValue}) => {
    try {
        const {data} = await apiClient.post(`${AUTH_ENDPOINT}/refreshToken`);

        return data;

    } catch(error){
        return rejectWithValue(error.response.data.error.message);
    }
});

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
            state.user = action.payload.user; // server sends back a response object that contains a nested user object. Set state of the user in the store with the received user data
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
            state.user = action.payload.user; // server sends back a response object that contains a nested user object inside the payload
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
        .addCase(refreshAccessToken.pending, (state, action) => {
            state.status = "loading";
            state.error = action.payload;
        })
        .addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload.user;
        })
        .addCase(refreshAccessToken.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },
});

export const {logout} = userSlice.actions;

export const userReducer = userSlice.reducer;