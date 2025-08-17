import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth-api";
import authReducer from './features/auth/auth-slice';
import eventsReducer from './features/events/event-slice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
})