"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubmitFormMutation = void 0;
var api_1 = require("../api");
var urls = {
    VOLUNTEER_INTEREST: "/volunteers/signup",
    CBO_REPORT: "/meal-program/cbo-report",
    NEW_MEAL_SURVEY: "/meal-program/survey",
    BIKE_SIGNUP: "/volunteers/bike",
    CULINARY_TRAINING: "/meal-program/workforce-development",
};
var formApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        submitForm: builder.mutation({
            query: function (_a) {
                var formData = _a.formData, name = _a.name;
                return ({
                    url: urls[name],
                    body: formData,
                    method: "POST",
                });
            },
        }),
    }); },
});
exports.useSubmitFormMutation = formApi.useSubmitFormMutation;
