import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserStatus, selectCurrentUser } from "../../redux/user/userSelector";
import { useNavigate } from "react-router-dom";

import FormInput from "./form-input-component";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../../utilities/yup-form-validation";
import { PulseLoader } from "react-spinners";

import { loginUser } from "../../redux/user/userReducer";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserStatus = useSelector(selectCurrentUserStatus);
    // const currentUser = useSelector(selectCurrentUser)

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(loginFormSchema),
    });

    // useEffect(() => {
    //     if(currentUser){
    //         navigate("/")
    //     }
    // }, [currentUser, navigate])

    const onSubmitHandler = async (data) => {
        console.log(data);
        const result = await dispatch(loginUser({...data}));
        console.log(result)

        if(result.payload.user){
            navigate("/");
        }

        reset();
    };

    const navigateToRegisterPage = () => navigate("/register");

  return (
    <div className="dark:bg-dark_bg_1 min-h-screen w-full flex items-center justify-center align-center overflow-hidden">

        <div className="dark:bg-dark_bg_2 max-w-md space-y-8 p-10 rounded-xl">
            <div className="flex flex-col items-center align-center justify-center text-white tracking-wide">
                <h1 className="text-xl">Welcome Back!</h1>
                <span className="text-sm mt-[4px]">Sign in</span>
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormInput register={register} error={errors.email?.message} name="email" type="email" placeholder="Email" ></FormInput>
                <FormInput register={register} error={errors.password?.message} name="password" type="password" placeholder="Password" ></FormInput>

                <div className="flex flex-col justify-center align-center items-center mt-8 text-white">
                    <button type="submit" className="cursor-pointer mb-4 text-gray-100 bg-green_1 w-full tracking-wide rounded-full p-2 hover:bg-green_2 ease-in duration-300 font-semibold">
                        {currentUserStatus === "loading" ? <PulseLoader size={16} color="#fff"></PulseLoader> : "Login"}
                    </button>

                    <h3>Don't have an account?</h3>
                    <span className="text-sm hover:underline cursor-pointer" onClick={navigateToRegisterPage}>Register</span>
                </div>
                
            </form>
        </div>

    </div>
  );
};

export default LoginForm;
