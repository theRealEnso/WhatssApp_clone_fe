import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    picture?: string;
    status?: string;
    token: string;
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
    password: "",
    confirmPassword: "",
    picture: "",
    status: "",
    token: "",
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
                password: "",
                confirmPassword: "",
                picture: "",
                status: "",
                token: "",
            }
        }
    },


});

export const {logout} = userReducer.actions;

export default userReducer.reducer;