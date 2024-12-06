import axios from "axios";

import { refreshAccessToken, logout } from "../redux/user/userReducer";

import { StoreType } from "../redux/store";

// note -- Interceptors in axiosInstance cannot directly use useDispatch or useSelector because those are hooks designed for components, and axiosInstance exists outside React's component tree. A common workaround is to pass the dispatch and getState methods from the Redux store as arguments to the axiosInstance (or the entire redux store?)

//creating an Axios instance (axiosInstance) lets us define shared settings for all requests made with this instance, such as the base URL for your API. By using interceptors, we can add custom logic to every request and response processed by this instance.

//both request and response interceptors have two main arguments: 1.) a callback function that takes `config` and `response` as an argument respectively and 2.) a function to handle errors

// => config is the configuration object for the current request, whereas response is the response object
// Some key properties of the config object that you may commonly modify include:

// - headers: Contains all the headers to be sent with the request.
// - url: The URL of the request.
// - method: The HTTP method (e.g., GET, POST).
// - data: The body data for POST, PUT, and other methods that send data.
// - params: The query parameters for GET requests

//The response interceptor is called after the server's response is received, but before the response is returned to the caller (e.g., your React component or wherever you're making the API call).

//The response object passed into the callback function contains:

//- The data returned by the server (the body of the response).
//- The status code (e.g., 200 for success, 401 for unauthorized).
//- The headers returned by the server.
//- The config used for the request (this is useful for retrying the request with modified settings).

// let refreshTokenPromise = null;

const axiosInstance = (store: StoreType) => {
    const instance = axios.create({
        baseURL: process.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT,
    });

    // Request Interceptor => modify the configuration object by attaching the current access token from the redux store to the headers of outgoing front end requests
    instance.interceptors.request.use(
        (config) => {
            const { access_token } = store.getState().user;
            if (access_token) {
                config.headers['Authorization'] = `Bearer ${access_token}`;
            }
            return config; //return the modified config object
        },
        (error) => Promise.reject(error)
    );

    // Response Interceptor => catch 401 Unauthorized errors, which indicates an expired access token. If there is an expired access token, then the interceptor will attempt to retry the request
    instance.interceptors.response.use(
        (response) => response, // no modification if the response is successful
        async (error) => {
            const originalRequest = error.config;

            //when a response with a 401 status is received, then check if this request has already been retried. If it hasn't then retry it.
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    //If it is the first 401 error, then dispatch the `refreshAccessToken async thunk, which again sends a post request to our `refreshToken` api endpoint, which validates the stored refresh token ,generates a new access token, and responds back with an updated user object containing the new access token
                    await store.dispatch(refreshAccessToken());

                    // Retrieve the new access token from the updated user stored in the state
                    const newAccessToken = store.getState().user.access_token;

                    // Set the Authorization header and retry the request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);

                    //If the refresh attempt fails (e.g., due to an invalid or expired refresh token), we redirect the user to the login page.
                } catch (refreshError) {
                    store.dispatch(logout());
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default axiosInstance;