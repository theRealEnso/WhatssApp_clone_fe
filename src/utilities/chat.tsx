export const getRecipientUser = (loggedInUserId, usersArray) => {
    const recipientUserData = usersArray.filter((user) => user._id !== loggedInUserId)[0];

    return recipientUserData;
};

export const getRecipientUserId = (loggedInUserId, usersArray) => {
    const recipientUserData = usersArray.filter((user) => user._id !== loggedInUserId);
    const recipientUser = recipientUserData[0];
    const recipient_id = recipientUser._id;

    return recipient_id;
};