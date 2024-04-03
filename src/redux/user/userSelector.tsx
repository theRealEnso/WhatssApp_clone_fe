export const selectUserReducer = (state) => state.user;

export const selectCurrentUser = (state) => state.user.user // selects user object nested inside the user reducer

export const selectCurrentUserStatus = (state) => state.user.status;