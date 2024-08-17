//import component(s)
import { UserTag } from "./user-tag-component";

export const TaggedUserList = ({taggedUsers}) => {
  return (
    <div className="w-full mt-6 flex flex-wrap space-x-2 space-y-2">
      {
        taggedUsers && taggedUsers.map((taggedUser, idx) => {
          return (
            <UserTag key={taggedUser._id} userData={taggedUser} index={idx}></UserTag>
          )
        })
      }
    </div>
  );
};
