import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: { message: '' },
  reducers: {
    setAlert(state, action) {
      state.message = action.payload;
    },
    clearAlert(state) {
      state = { message: '' };
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
