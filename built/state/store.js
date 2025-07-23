"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var api_1 = require("./api");
var errorSlice_1 = __importDefault(require("./apis/slices/errorSlice"));
var alertSlice_1 = __importDefault(require("./apis/slices/alertSlice"));
var volunteerSlice_1 = __importDefault(require("./apis/slices/volunteerSlice"));
var errorHandler_1 = require("./middleware/errorHandler");
exports.store = (0, toolkit_1.configureStore)({
    reducer: (_a = {},
        _a[api_1.api.reducerPath] = api_1.api.reducer,
        _a.error = errorSlice_1.default,
        _a.alert = alertSlice_1.default,
        _a.volunteer = volunteerSlice_1.default,
        _a),
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().prepend(errorHandler_1.rtkQueryErrorLogger).concat(api_1.api.middleware);
    },
});
