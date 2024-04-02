import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema } from '../../utilities/yup-form-validation';
import { FormInput } from './form-input-component';
import { registerUser } from '../../redux/user/userReducer';

import { PictureInput } from '../picture-input-component';

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [readableImage, setReadableImage] = useState("");
    const [image, setImage] = useState("");

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerFormSchema),
    });

    const onSubmitHandler = async (data) => {
        console.log(data);
        await dispatch(registerUser(data));
        // reset();
    };

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

                <PictureInput readableImage={readableImage} setReadableImage={setReadableImage} setImage={setImage} ></PictureInput>

                <button type="submit" className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300">Register</button>
            </form>

            <div className="flex items-center justify-center flex-col dark:text-dark_text_1">
                <span>Already have an account?</span>
                <span className="cursor-pointer hover:underline transition ease-in duration-300" onClick={navigateToLoginPage}>Sign in</span>
            </div>

        </div>
    </div>
    )
};

// basic react hook form

{/* <form onSubmit={handleSubmit(onSubmitHandler)}>
<h1>Welcome!</h1>
<span>Sign in.</span>
<br></br>

<input {...register("firstName")} placeholder="First Name" type="text" required></input>
<p>{errors.firstName?.message}</p>

<button type="submit">Register</button>

</form> */}


