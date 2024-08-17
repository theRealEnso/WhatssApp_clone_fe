import { useState } from "react";
import { useDispatch } from "react-redux";

//import redux action(s)
import { removeTaggedUser } from "../../../redux/chat/chatReducer";

export const UserTag = ({userData, index}) => {
    const dispatch = useDispatch();

    const [isRemoveHovered, setIsRemoveHovered] = useState<boolean>(false);
    const [isTagHovered, setIsTagHovered] = useState<boolean>(false);

    const removeTag = () => {
        dispatch(removeTaggedUser(index));
    }
  return (
    <div className="flex items-center cursor-pointer" onMouseEnter={() => setIsTagHovered(true)} onMouseLeave={() => setIsTagHovered(false)}>
        <div className={`${isTagHovered ? "dark:bg-green_1 dark:text-dark_text_1 transition-all" : "dark:bg-green_3 dark:text-dark_text_2"}  rounded-lg p-2 flex space-x-4`}>
            <span className={`font-semibold tracking-wide`}>
                {`${userData.firstName} ${userData.lastName}`}
            </span>

            <div 
                className={`${isRemoveHovered ? "dark:bg-red_2 transition-all" : "dark:bg-red_1"} border-2 rounded-full w-[25px] h-[25px] flex items-center justify-center`}
                onMouseEnter={() => setIsRemoveHovered(true)}
                onMouseLeave={() => setIsRemoveHovered(false)}
                >
                <button className={`cursor-pointer`} onClick={removeTag}>
                    <span className="dark:text-dark_text_4">X</span>
                </button>
            </div>
        </div>
    </div>
  );
};
