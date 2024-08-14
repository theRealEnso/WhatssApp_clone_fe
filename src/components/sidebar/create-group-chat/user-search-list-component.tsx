import { UserCard } from "./user-card-component";

export const UserSearchList = ({filteredUsers, taggedUsers, setTaggedUsers}) => {

  return (
    <div>
        {
            !filteredUsers.length 
            ? null
            : filteredUsers.map((user) => {
              return (
                <UserCard  key={user._id }user={user} taggedUsers={setTaggedUsers}></UserCard>
              )
            })
        }

    </div>
  );
};
