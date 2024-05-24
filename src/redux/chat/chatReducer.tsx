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
    messages: [],
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

export const sendMessage = createAsyncThunk("messages/send", async (payloadData, {rejectWithValue}) => {
    const {access_token, message, conversation_id} = payloadData
    try {
        const {data} = await axios.post(MESSAGES_ENDPOINT, {conversation_id, message}, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data;
    } catch(error){
        return rejectWithValue(error.response.data.error.message)
    }
})

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
        .addCase(sendMessage.pending, (state, action) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.messages = [...state.messages, action.payload];

            //the conversation that received the latest message needs to be displayed at the top on the front end
            //how to get the conversation that received the latest message? Well, we know that if we send a message, then every message has additional data attached to it, one being the conversation object that is attached to the message as was defined in the schema
            //we can perhaps try creating a new array by filtering out the active conversation array, leaving an array with all the other conversations.
            //then, we can create an updated conversation with the necessary updates, and then unshift that to pop it onto the beginning of the array


            //get the latest message
            const newestMessage = action.payload;

            //from the latest or newest message, grap the conversation object
            const conversationToUpdate = newestMessage.conversation;

            //create a new conversation object, spreading over the previous values of the conversation, and update the latest message field with the newest message. Use this to unshift into the new array
            const updatedConversation = {
                ...conversationToUpdate,
                latestMessage: newestMessage
            }

            const currentConvos = [...state.conversations];
            let updatedConvos = currentConvos.filter((conversation) => conversation._id !== updatedConversation._id);
            updatedConvos.unshift(updatedConversation);

            state.conversations = [...updatedConvos];


        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },

});

export const {clearActiveConversation} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;