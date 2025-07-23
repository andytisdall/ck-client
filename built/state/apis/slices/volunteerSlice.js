"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var authApi_1 = require("../authApi");
var volunteerApi_1 = require("../volunteerApi/volunteerApi");
var initialState = { volunteer: null };
var volunteerSlice = (0, toolkit_1.createSlice)({
    name: "volunteer",
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder.addMatcher(volunteerApi_1.volunteerApi.endpoints.getVolunteer.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.volunteer = payload;
        });
        builder.addMatcher(volunteerApi_1.volunteerApi.endpoints.createVolunteer.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.volunteer = payload;
        });
        builder.addMatcher(authApi_1.userApi.endpoints.getUser.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            if (payload) {
                state.volunteer = null;
            }
        });
        builder.addMatcher(function (_a) {
            var type = _a.type;
            return type === "volunteer/reset";
        }, function () { return initialState; });
    },
});
exports.default = volunteerSlice.reducer;
