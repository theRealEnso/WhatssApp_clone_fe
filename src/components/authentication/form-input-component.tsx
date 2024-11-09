const FormInput = ({register, error, name, placeholder, ...otherProperties}) => {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label htmlFor={name} className="text-sm font-bold tracking-wide">{placeholder}</label>
        
        {/* //register input into the handleSubmit hook by invoking the 'register' function from react-hook-forms */}
        <input {...register(name)} placeholder={placeholder} {...otherProperties} className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"></input>
        {error && <p className="text-red-400">{error}</p>}
    </div>

  );
};

export default FormInput;
