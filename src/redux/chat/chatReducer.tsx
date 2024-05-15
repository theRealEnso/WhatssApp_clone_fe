import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const CONVERSATIONS_ENDPOINT = `${import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT}/conversations`;
const MESSAGES_ENDPOINT = `${import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT}/messages`

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

export const openConversation = createAsyncThunk("conversations/active", async (payloadData, {rejectWithValue}) => {
    const {access_token, recipient_id} = payloadData;
    try {
        const {data} = await axios.post(CONVERSATIONS_ENDPOINT, {recipient_id: recipient_id}, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return data
    } catch(error){
        return rejectWithValue(error.response.data.error.message);
    }
});

export const getAllConversationMessages = createAsyncThunk("messages/all", async (payloadData, {rejectWithValue}) => {
    const {access_token, conversation_id} = payloadData;

    try {
        const {data} = await axios.get(`${MESSAGES_ENDPOINT}/${conversation_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return data;
    } catch (error){
        return rejectWithValue(error.response.data.error.message)
    }
});

export const chatSlice = createSlice({
    name: "chat",
    initialState: CHAT_INITIAL_STATE,
    reducers: {
        clearActiveConversation: (state) => {
            state.activeConversation = {};
        },
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
        .addCase(openConversation.pending, (state, action) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(openConversation.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.activeConversation = action.payload;
        })
        .addCase(openConversation.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(getAllConversationMessages.pending, (state, action) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(getAllConversationMessages.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.messages = [...action.payload];
        })
        .addCase(getAllConversationMessages.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },

});

export const {clearActiveConversation} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;