import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema } from '../../utilities/yup-form-validation';
import FormInput from './form-input-component';
import PictureInput from '../picture-input-component';
import { registerUser } from '../../redux/user/userReducer';

import { selectCurrentUserStatus } from '../../redux/user/userSelector';

import { PulseLoader } from 'react-spinners';

//environment variables
const cloudinary_name = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_NAME;
const cloudinary_key = import.meta.env.VITE_REACT_APP_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME;

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUserStatus = useSelector(selectCurrentUserStatus)

    const [readablePicture, setReadablePicture] = useState("");
    const [picture, setPicture] = useState("");

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerFormSchema),
    });

    const onSubmitHandler = async (data) => {
        console.log(data);
        // const uploadedImage = await uploadImageToCloudinary();
        // console.log(uploadedImage)
        // await dispatch(registerUser(data));
        let result;

        if(picture){
            const uploadedImage = await uploadImageToCloudinary();
            const storedCloudinaryImageUrl = uploadedImage.secure_url;
            result = await dispatch(registerUser({...data, picture: storedCloudinaryImageUrl}));
            // console.log(result);
        } else {
           result = await dispatch(registerUser({...data}));
        //    console.log(result);
        }
        
        if(result.payload.user){
            navigate("/")
        }
        reset();
    };

    const uploadImageToCloudinary = async () => {
        const formData = new FormData();
        formData.append("upload_preset", cloudinary_key);
        formData.append("file", picture);
        const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, formData);
        return data;
    }

    const navigateToLoginPage = () => navigate("/login");

    return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            <div className="text-center dark:text-dark_text_1">
                <h1 className="mt-6 text-3xl font-bold">Welcome!</h1>
                <span className="mt-2 text-sm">Create an account</span>
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-6 space-y-8">
                <FormInput register={register} error={errors.firstName?.message} name="firstName" placeholder="First Name" type="text" required></FormInput>
                <FormInput register={register} error={errors.lastName?.message} name="lastName" placeholder="Last Name" type="text" required></FormInput>
                <FormInput register={register} error={errors.email?.message} name="email" placeholder="Email" type="email" required></FormInput>
                <FormInput register={register} error={errors.password?.message} name="password" placeholder="Password" type="password" required></FormInput>
                <FormInput register={register} error={errors.confirmPassword?.message} name="confirmPassword" placeholder="Confirm Password" type="password" required></FormInput>
                <FormInput register={register} error={errors.status?.message} name="status" placeholder="Status (optional)" type="text"></FormInput>
                <p>{errors.firstName?.message}</p>

                <PictureInput readablePicture={readablePicture} setReadablePicture={setReadablePicture} setPicture={setPicture} ></PictureInput>

                <button type="submit" className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300">{currentUserStatus === "loading" ? <PulseLoader color="#fff" size={16}></PulseLoader> : "Register"}</button>
            </form>

            <div className="flex items-center justify-center flex-col dark:text-dark_text_1">
                <span>Already have an account?</span>
                <span className="cursor-pointer hover:underline transition ease-in duration-300" onClick={navigateToLoginPage}>Sign in</span>
            </div>

        </div>
    </div>
    )
};

export default RegisterForm;

// basic react hook form

{/* <form onSubmit={handleSubmit(onSubmitHandler)}>
<h1>Welcome!</h1>
<span>Sign in.</span>
<br></br>

<input {...register("firstName")} placeholder="First Name" type="text" required></input>
<p>{errors.firstName?.message}</p>

<button type="submit">Register</button>

</form> */}


