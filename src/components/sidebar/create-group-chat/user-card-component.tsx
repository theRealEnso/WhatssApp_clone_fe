export const UserCard = ({user, taggedUsers, setTaggedUsers}) => {

    const addTaggedUser = () => {
        setTaggedUsers([...taggedUsers, user]);
    };

    console.log(taggedUsers);
  return (
    <div 
        className="flex flex-auto items-center space-x-4 mt-8 p-2 outline-0 cursor-pointer rounded-lg hover:bg-dark_bg_2 hover:border-2 hover:border-green_1 shadow-inner shadow-2xl shadow-dark_bg_5 focus:ring-2 focus:ring-green_1 active:ring-2 active:ring-green_1 active:transition-shadow duration-75"
        onClick={addTaggedUser}>
        <div className="">
            <img src={user.picture} className="w-[60px] h-[50px] rounded-full object-cover"></img>
        </div>

        <div className="flex flex-col tracking-wide border-y-2 dark:border-dark_border_2 w-full">
            <span className="dark:text-white">{`${user.firstName} ${user.lastName}`}</span>
            <span className="dark:text-dark_text_2">{user.status}</span>
        </div>
    </div>
  );
};
