"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAlert = exports.setAlert = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var alertSlice = (0, toolkit_1.createSlice)({
    name: 'alert',
    initialState: { message: '' },
    reducers: {
        setAlert: function (state, action) {
            state.message = action.payload;
        },
        clearAlert: function (state) {
            state = { message: '' };
        },
    },
});
exports.setAlert = (_a = alertSlice.actions, _a.setAlert), exports.clearAlert = _a.clearAlert;
exports.default = alertSlice.reducer;
