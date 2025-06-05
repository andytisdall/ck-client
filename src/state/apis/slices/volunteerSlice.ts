import { createSlice } from "@reduxjs/toolkit";

import { Volunteer } from "../volunteerApi/types";
import { userApi } from "../authApi";
import { volunteerApi } from "../volunteerApi/volunteerApi";

const initialState: { volunteer: Volunteer | null } = { volunteer: null };

const volunteerSlice = createSlice({
  name: "volunteer",
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
    builder.addMatcher(
      ({ type }) => type === "volunteer/reset",
      () => initialState
    );
  },
});

export default volunteerSlice.reducer;
