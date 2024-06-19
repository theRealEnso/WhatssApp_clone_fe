export const Input = ({message, setMessage}) => {

  const handleInputChange = (event) => setMessage(event.target.value);

  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg px-2">
      {/* Message input */}
      <input 
        type="text" 
        placeholder="Type a message..." 
        value={message} 
        onChange={handleInputChange}
        className="w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text_1">

      </input>
    </div>
  )
}
