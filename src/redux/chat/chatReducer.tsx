import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const CONVERSATIONS_ENDPOINT = `${import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT}/conversations`;

type ChatState = {
    status: string;
    error: string;
    name: string;
    conversations: [];
    activeConversation: object;
    messages: [];
}

const CHAT_INITIAL_STATE: ChatState = {
    status: "",
    error: "",
    name: "",
    conversations: [],
    activeConversation: {},
    messages: []
};

export const getAllUserConversations = createAsyncThunk("conversations/all", async (access_token, {rejectWithValue}) => {
    // const {access_token} = payloadData;

    try {
        const {data} = await axios.get(CONVERSATIONS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        // console.log(data);
        return data;

    } catch(error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const chatSlice = createSlice({
    name: "chat",
    initialState: CHAT_INITIAL_STATE,
    reducers: {

    },

    extraReducers(builder) {
        builder
        .addCase(getAllUserConversations.pending, (state, action) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(getAllUserConversations.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.conversations = action.payload;
        })
        .addCase(getAllUserConversations.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },

});

export const chatReducer = chatSlice.reducer;