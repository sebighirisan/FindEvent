import { Event } from '@/model/event.model';
import { PaginatedResponseModel } from '@/model/paging.model';
import { createSlice } from '@reduxjs/toolkit';

interface EventState {
  userInterestedEvents: PaginatedResponseModel<Event> | null,
  userGoingEvents: PaginatedResponseModel<Event> | null,
  trendingEvents: PaginatedResponseModel<Event> | null,
  upcomingEvents: Event[],
  filteredEvents: PaginatedResponseModel<Event> | null,
}

const initialState: EventState = {
  userInterestedEvents: null,
  userGoingEvents: null,
  trendingEvents: null,
  upcomingEvents: [],
  filteredEvents: null,
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {

  },
});

// export const { } = eventsSlice.actions;
export default eventsSlice.reducer;