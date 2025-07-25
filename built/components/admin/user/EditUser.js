"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var authApi_1 = require("../../../state/apis/authApi");
var errorSlice_1 = require("../../../state/apis/slices/errorSlice");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var EditUser = function () {
    var _a = __read((0, react_1.useState)(""), 2), user = _a[0], setUser = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), username = _b[0], setUsername = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), salesforceId = _c[0], setSalesforceId = _c[1];
    var _d = __read((0, react_1.useState)(), 2), busDriver = _d[0], setBusdriver = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), password1 = _e[0], setPassword1 = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), password2 = _f[0], setPassword2 = _f[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var _g = __read((0, authApi_1.useEditUserMutation)(), 1), editUser = _g[0];
    var users = (0, authApi_1.useGetAllUsersQuery)().data;
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (password1 !== password2) {
                        return [2 /*return*/, dispatch((0, errorSlice_1.setError)("Passwords do not match"))];
                    }
                    return [4 /*yield*/, editUser({
                            userId: user,
                            username: username,
                            password: password1,
                            salesforceId: salesforceId,
                            busDriver: busDriver,
                        }).unwrap()];
                case 1:
                    _a.sent();
                    dispatch((0, alertSlice_1.setAlert)("User Edited"));
                    setUser("");
                    setUsername("");
                    setSalesforceId("");
                    setBusdriver(false);
                    setPassword1("");
                    setPassword2("");
                    return [2 /*return*/];
            }
        });
    }); };
    var renderUsers = function () {
        if (users) {
            return Object.values(users)
                .sort(function (a, b) { return (a.username > b.username ? 1 : -1); })
                .map(function (u) {
                return ((0, jsx_runtime_1.jsxs)("option", { value: u.id, children: [u.admin && "* ", u.username] }, u.id));
            });
        }
    };
    var onUserSelect = function (e) {
        if (users) {
            var usr = users[e.target.value];
            if (usr) {
                setUser(usr.id);
                setUsername(usr.username);
                setSalesforceId(usr.salesforceId);
                setBusdriver(usr.busDriver);
                setPassword1("");
                setPassword2("");
            }
            else {
                setUser("");
                setUsername("");
                setSalesforceId("");
                setPassword1("");
                setPassword2("");
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Edit a User" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsxs)("select", { required: true, name: "user", value: user, onChange: onUserSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a User" }), renderUsers()] }), !!user && (0, jsx_runtime_1.jsxs)("div", { className: "admin-id-text", children: ["ID: ", user] }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Username:" }), (0, jsx_runtime_1.jsx)("input", { id: "name", type: "text", value: username, required: true, onChange: function (e) { return setUsername(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "salesforceId", children: "Salesforce ID:" }), (0, jsx_runtime_1.jsx)("input", { id: "salesforceId", type: "text", value: salesforceId, onChange: function (e) { return setSalesforceId(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "password1", children: "Password:" }), (0, jsx_runtime_1.jsx)("input", { id: "password1", type: "password", value: password1, onChange: function (e) { return setPassword1(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "password2", children: "Re-Enter Password:" }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password2, id: "password2", onChange: function (e) { return setPassword2(e.target.value); } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "busDriver", children: "Bus Driver" }), (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: busDriver, id: "password2", onChange: function (e) { return setBusdriver(e.target.checked); } })] }), (0, jsx_runtime_1.jsx)("input", { type: "submit" })] })] }));
};
exports.default = EditUser;
