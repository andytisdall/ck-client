"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var google_1 = require("@react-oauth/google");
var react_redux_1 = require("react-redux");
var authApi_1 = require("../../state/apis/authApi");
var errorSlice_1 = require("../../state/apis/slices/errorSlice");
var alertSlice_1 = require("../../state/apis/slices/alertSlice");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var ConnectGoogle = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = __read((0, authApi_1.useConnectGoogleMutation)(), 2), connectGoogle = _a[0], isLoading = _a[1].isLoading;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    return ((0, jsx_runtime_1.jsx)(google_1.GoogleLogin, { onSuccess: function (_a) {
            var credential = _a.credential;
            if (credential) {
                connectGoogle(credential)
                    .unwrap()
                    .then(function () {
                    return dispatch((0, alertSlice_1.setAlert)('You can now login using this google account.'));
                });
            }
        }, onError: function () { return dispatch((0, errorSlice_1.setError)('Google Login Failed')); } }));
};
exports.default = ConnectGoogle;
