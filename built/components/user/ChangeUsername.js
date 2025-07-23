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
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var alertSlice_1 = require("../../state/apis/slices/alertSlice");
var authApi_1 = require("../../state/apis/authApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var ChangeUsername = function () {
    var user = (0, authApi_1.useGetUserQuery)().data;
    var _a = __read((0, authApi_1.useEditUserMutation)(), 2), editUser = _a[0], isLoading = _a[1].isLoading;
    var _b = __read((0, react_1.useState)((user === null || user === void 0 ? void 0 : user.username) || ""), 2), username = _b[0], setUsername = _b[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSubmit = function (e) {
        e.preventDefault();
        if (user && username) {
            editUser({ userId: user.id, username: username })
                .unwrap()
                .then(function () {
                dispatch((0, alertSlice_1.setAlert)("You have changed your username to " + username));
                navigate("/");
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Change Your Username" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Username:" }), (0, jsx_runtime_1.jsx)("input", { name: "name", type: "text", value: username, required: true, onChange: function (e) { return setUsername(e.target.value); } }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = ChangeUsername;
