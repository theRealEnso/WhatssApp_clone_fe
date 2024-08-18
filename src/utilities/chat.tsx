export const getRecipientUser = (loggedInUserId, usersArray) => {
    const recipientUserData = usersArray.filter((user) => user._id !== loggedInUserId)[0];

    return recipientUserData;
};

export const getRecipientUserId = (loggedInUserId, usersArray) => {
    if(!usersArray){
        console.log("no users array detected!")
        return null;
    }
    const recipientUserData = usersArray.filter((user) => user._id !== loggedInUserId);
    const recipientUser = recipientUserData[0];
    const recipient_id = recipientUser._id;

    return recipient_id;
};

export const checkOnlineStatus = (onlineUsersArray, loggedInUserId, usersArray) => {
    const recipientUserId = getRecipientUserId(loggedInUserId, usersArray);

    //check if recipient user ID is in the online users array
    const onlineUser = onlineUsersArray.find((user) => user.userId === recipientUserId);

    return onlineUser ? true : false;
};

export const onlineUsersInGroupChat = (onlineUsersArray, usersArrayOfIds) => {
    const onlineIds = [];
    let userCount = 0;

    for (const user of onlineUsersArray){
        onlineIds.push(user.userId);
    }

    for(const id of usersArrayOfIds){
        if(onlineIds.includes(id)){
            userCount ++;
        }
    }

    return userCount;
}