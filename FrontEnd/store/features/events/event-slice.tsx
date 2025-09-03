import { Event } from "@/model/event.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  userInterestedEvents: Event[];
  userGoingEvents: Event[];
  trendingEvents: Event[];
  upcomingEvents: Event[];
}

const initialState: EventState = {
  userInterestedEvents: [],
  userGoingEvents: [],
  trendingEvents: [],
  upcomingEvents: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setUserGoingEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.userGoingEvents = payload;
    },
    setUserInterestedEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.userInterestedEvents = payload;
    },
    setUpcomingEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.upcomingEvents = payload;
    },
    setTrendingEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.trendingEvents = payload;
    },
    addInterestedEvent: (
      state,
      { payload }: PayloadAction<{ event: Event; username: string }>
    ) => {
      const newEvent: Event = {
        ...payload.event,
        interested: [...payload.event.interested, payload.username],
        going: payload.event.going.filter((user) => user !== payload.username),
      };

      state.userInterestedEvents = [...state.userInterestedEvents, newEvent];
      state.userGoingEvents = state.userGoingEvents.filter(
        (event) => event.id !== payload.event.id
      );

      state.upcomingEvents = state.upcomingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
      state.trendingEvents = state.trendingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
    },
    removeInterestedEvent: (
      state,
      { payload }: PayloadAction<{ event: Event; username: string }>
    ) => {
      const newEvent: Event = {
        ...payload.event,
        interested: payload.event.interested.filter(
          (interestedUser) => interestedUser !== payload.username
        ),
      };

      state.userInterestedEvents = state.userInterestedEvents.filter(
        (event) => event.id !== payload.event.id
      );

      state.upcomingEvents = state.upcomingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
      state.trendingEvents = state.trendingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
    },
    addGoingEvent: (
      state,
      { payload }: PayloadAction<{ event: Event; username: string }>
    ) => {
      const newEvent: Event = {
        ...payload.event,
        interested: payload.event.interested.filter(
          (user) => user !== payload.username
        ),
        going: [...payload.event.going, payload.username],
      };

      state.userGoingEvents = [...state.userGoingEvents, newEvent];
      state.userInterestedEvents = state.userInterestedEvents.filter(
        (event) => event.id !== payload.event.id
      );

      state.upcomingEvents = state.upcomingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
      state.trendingEvents = state.trendingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
    },
    removeGoingEvent: (
      state,
      { payload }: PayloadAction<{ event: Event; username: string }>
    ) => {
      const newEvent: Event = {
        ...payload.event,
        going: payload.event.going.filter(
          (goingUser) => goingUser !== payload.username
        ),
      };

      state.userGoingEvents = state.userGoingEvents.filter(
        (event) => event.id !== payload.event.id
      );

      state.upcomingEvents = state.upcomingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
      state.trendingEvents = state.trendingEvents.map((existingEvent) =>
        existingEvent.id === payload.event.id ? newEvent : existingEvent
      );
    },
  },
});

export const {
  setUpcomingEvents,
  setUserGoingEvents,
  setUserInterestedEvents,
  setTrendingEvents,
  addInterestedEvent,
  removeInterestedEvent,
  addGoingEvent,
  removeGoingEvent,
} = eventsSlice.actions;
export default eventsSlice.reducer;
