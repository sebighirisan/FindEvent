import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    userEvents: [],
  },
  reducers: {},
});

// export const { } = eventsSlice.actions;
export default eventsSlice.reducer;