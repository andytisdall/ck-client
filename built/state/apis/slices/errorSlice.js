"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearError = exports.setError = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var errorSlice = (0, toolkit_1.createSlice)({
    name: 'error',
    initialState: { message: '' },
    reducers: {
        setError: function (state, action) {
            state.message = action.payload;
        },
        clearError: function (state) {
            state = { message: '' };
        },
    },
});
exports.setError = (_a = errorSlice.actions, _a.setError), exports.clearError = _a.clearError;
exports.default = errorSlice.reducer;
