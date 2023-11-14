import { createSlice } from '@reduxjs/toolkit';

import { ckKitchenApi, Volunteer } from '../volunteerApi';
import { userApi } from '../authApi';

const initialState: { volunteer: Volunteer | null } = { volunteer: null };

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ckKitchenApi.endpoints.getVolunteer.matchFulfilled,
      (state, { payload }) => {
        state.volunteer = payload;
      }
    );
    builder.addMatcher(
      ckKitchenApi.endpoints.createVolunteer.matchFulfilled,
      (state, { payload }) => {
        state.volunteer = payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        if (payload) {
          state = initialState;
        }
      }
    );
  },
});

export default volunteerSlice.reducer;
