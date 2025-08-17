import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null
  },
  reducers: {},
});

// export const { } = eventsSlice.actions;
export default authSlice.reducer;