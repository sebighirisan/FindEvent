import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth-api";
import authReducer from './features/auth/auth-slice';
import { eventApi } from "./features/events/event-api";
import eventsReducer from './features/events/event-slice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(eventApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>