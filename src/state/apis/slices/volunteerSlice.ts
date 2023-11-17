import { createSlice } from '@reduxjs/toolkit';

import { volunteerApi, Volunteer } from '../volunteerApi';
import { userApi } from '../authApi';

const initialState: { volunteer: Volunteer | null } = { volunteer: null };

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      volunteerApi.endpoints.getVolunteer.matchFulfilled,
      (state, { payload }) => {
        state.volunteer = payload;
      }
    );
    builder.addMatcher(
      volunteerApi.endpoints.createVolunteer.matchFulfilled,
      (state, { payload }) => {
        state.volunteer = payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        if (payload) {
          state.volunteer = null;
        }
      }
    );
  },
});

export default volunteerSlice.reducer;
