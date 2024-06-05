export const selectChatReducer = (state) => state.chat;

export const selectAllUserConversations = (state) => state.chat.conversations;

export const selectActiveConversation = (state) => state.chat.activeConversation;

export const selectConversationMessages = (state) => state.chat.messages;

export const selectOnlineUsers = (state) => state.chat.onlineUsers;