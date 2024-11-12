import { UserCard } from "./user-card-component";

export const UserSearchList = ({userSearchResults, setUserSearchResults, setSearchExecuted}) => {

  return (
    <div>
        {
            !userSearchResults.length 
            ? null
            : userSearchResults.map((user, idx) => {
              return (
                <UserCard key={user._id } user={user} index={idx} setUserSearchResults={setUserSearchResults} setSearchExecuted={setSearchExecuted}></UserCard>
              )
            })
        }

    </div>
  );
};
