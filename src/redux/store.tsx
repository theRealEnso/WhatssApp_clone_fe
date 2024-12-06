import { configureStore } from "@reduxjs/toolkit";

import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import { rootReducer, RootState } from "./rootReducer";

import axiosInstance from "../api/axiosInstance";

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
};

//saveUserOnlyFilter
//createFilter takes 2 arguments: 1.) `reducerKey`, which is the key of the reducer to be filtered and 2.) `whitelist`, which is an array of keys within the specified reducer to be included in the filtered state
//the filter will only be applied to the slice of the Redux state corresponding to the `user` reducer, and only the "user" key inside of the user reducer is persisted
//filter restricts state persistence and retrieval to only the "user" key within the 'user' reducer slice, enabling more focused and efficient state management.
const saveUserOnlyFilter = createFilter("user", ["user"]);

const persistConfig: ExtendedPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true,
});

export const persistor = persistStore(store);

export const apiClient = axiosInstance(store);

export type StoreType = ReturnType<typeof store>;

