"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtkQueryErrorLogger = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var errorSlice_1 = require("../apis/slices/errorSlice");
var rtkQueryErrorLogger = function (api) { return function (next) { return function (action) {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if ((0, toolkit_1.isRejectedWithValue)(action)) {
        // console.log(action);
        var error = action.payload;
        var message = "";
        if (error) {
            if ("status" in error) {
                var data = error.data;
                if (typeof (data === null || data === void 0 ? void 0 : data.error) === "string") {
                    message = data.error;
                }
                else if (data) {
                    message = JSON.stringify(data);
                }
            }
            else if (error.message) {
                message = error.message;
            }
            console.log(message);
            api.dispatch((0, errorSlice_1.setError)(message));
        }
    }
    return next(action);
}; }; };
exports.rtkQueryErrorLogger = rtkQueryErrorLogger;
// {type: 'error/setError', payload: {…}}
// payload
// :
// {status: 401, data: {…}}
// type
// :
// "error/setError"
//
// payload
// :
// {status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch'}
// type
// :
// "error/setError"
