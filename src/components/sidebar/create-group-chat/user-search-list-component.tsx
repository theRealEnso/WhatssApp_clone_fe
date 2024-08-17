import { UserCard } from "./user-card-component";

export const UserSearchList = ({filteredUsers, setSearchInput}) => {

  return (
    <div>
        {
            !filteredUsers.length 
            ? null
            : filteredUsers.map((user, idx) => {
              return (
                <UserCard key={user._id } user={user} index={idx} setSearchInput={setSearchInput}></UserCard>
              )
            })
        }

    </div>
  );
};
