"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
require("./App.css");
require("./components/reusable/TextButton.css");
var renderWithFallback_1 = __importDefault(require("./components/reusable/loading/renderWithFallback"));
var react_redux_1 = require("react-redux");
var errorSlice_1 = require("./state/apis/slices/errorSlice");
var alertSlice_1 = require("./state/apis/slices/alertSlice");
// text service
var textRouter_1 = __importDefault(require("./components/text/textRouter"));
// // meal program onboarding
// import mealProgramRouter from "./components/mealProgram/mealProgramRouter";
// // admin
var adminRouter_1 = __importDefault(require("./components/admin/adminRouter"));
// user settings
var userRouter_1 = __importDefault(require("./components/user/userRouter"));
// // home chef
var homeChefRouter_1 = __importDefault(require("./components/homeChef/homeChefRouter"));
// // forms
var formsRouter_1 = __importDefault(require("./components/forms/formsRouter"));
// // volunteers
var volunteersRouter_1 = __importDefault(require("./components/volunteers/volunteersRouter"));
var cboRouter_1 = __importDefault(require("./components/cbo/cboRouter"));
var volunteerCheckInRouter_1 = __importDefault(require("./components/volunteer-check-in/volunteerCheckInRouter"));
var doorfrontRouter_1 = __importDefault(require("./components/doorfront/doorfrontRouter"));
// public home chef app page (no sign in required)
var HomeChefApp = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/homeChef/HomeChefApp")); }); });
var SalesforceNotFound = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/error/SalesforceNotFound")); }); });
var Home = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/Home")); }); });
var Header = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/header/Header")); }); });
var PageNotFound = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/error/PageNotFound")); }); });
var ForgotPassword = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/auth/ForgotPassword")); }); });
var ResetPassword = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/user/ResetPassword")); }); });
var DeleteD4JAccount = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/user/DeleteD4JAccount")); }); });
var ConfirmEmail = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./components/user/ConfirmEmail")); }); });
exports.router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Header, {})),
        errorElement: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(PageNotFound, {})),
        children: [
            {
                index: true,
                element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Home, {})),
            },
            {
                path: "forgot-password",
                element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(ForgotPassword, {})),
            },
            {
                path: "delete-data/:email",
                element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(DeleteD4JAccount, {})),
            },
            {
                path: "d4japp/account/confirm/:code",
                element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(ConfirmEmail, {})),
            },
            {
                path: "reset-password/:token",
                element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(ResetPassword, {})),
            },
            { path: "home-chef-app", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(HomeChefApp, {})) },
            textRouter_1.default,
            adminRouter_1.default,
            // mealProgramRouter,
            userRouter_1.default,
            homeChefRouter_1.default,
            volunteersRouter_1.default,
            cboRouter_1.default,
            { path: "404", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(SalesforceNotFound, {})) },
        ],
    },
    formsRouter_1.default,
    volunteerCheckInRouter_1.default,
    doorfrontRouter_1.default,
]);
var App = function () {
    var error = (0, react_redux_1.useSelector)(function (state) { return state.error.message; });
    var alert = (0, react_redux_1.useSelector)(function (state) { return state.alert.message; });
    var dispatch = (0, react_redux_1.useDispatch)();
    var renderError = function () {
        setTimeout(function () { return dispatch((0, errorSlice_1.setError)("")); }, 5000);
        return (0, jsx_runtime_1.jsx)("div", { className: "error", children: error });
    };
    var renderAlert = function () {
        setTimeout(function () { return dispatch((0, alertSlice_1.setAlert)("")); }, 5000);
        return (0, jsx_runtime_1.jsx)("div", { className: "error alert", children: alert });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: exports.router }), error && renderError(), alert && renderAlert()] }));
};
exports.default = App;
