export const UnderlineInput = ({groupName, setGroupName}) => {

    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };

  return (
    <div className="mt-4">
        <input 
            type="text" 
            placeholder="Enter a name for the group conversation" 
            value={groupName} 
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-none pl-1"
            >

        </input>
    </div>
  );
};
