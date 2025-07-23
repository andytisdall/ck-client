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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var authApi_1 = require("../../../state/apis/authApi");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var DeleteUser = function () {
    var _a = __read((0, react_1.useState)(), 2), user = _a[0], setUser = _a[1];
    var users = (0, authApi_1.useGetAllUsersQuery)().data;
    var _b = __read((0, authApi_1.useDeleteUserMutation)(), 1), deleteUser = _b[0];
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleSubmit = function () {
        if (user && window.confirm("Seriously delete ".concat(user.username))) {
            deleteUser(user.id)
                .unwrap()
                .then(function () { return dispatch((0, alertSlice_1.setAlert)('User Deleted')); });
            setUser(undefined);
        }
    };
    var renderUsers = function () {
        if (users) {
            return Object.values(users)
                .filter(function (u) { return !u.admin; })
                .sort(function (a, b) { return (a.username > b.username ? 1 : -1); })
                .map(function (u) {
                return ((0, jsx_runtime_1.jsx)("option", { value: u.id, children: u.username }, u.id));
            });
        }
    };
    var onUserSelect = function (e) {
        if (users) {
            var usr = users[e.target.value];
            if (usr) {
                setUser(usr);
            }
            else {
                setUser(undefined);
            }
        }
    };
    var showUserDetails = function () {
        if (user) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "admin-delete-user", children: Object.keys(user).map(function (key) {
                    // @ts-ignore
                    var keyInfo = user[key].toString();
                    return ((0, jsx_runtime_1.jsxs)("p", { children: [key, ": ", keyInfo] }, key));
                }) }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Delete a User" }), (0, jsx_runtime_1.jsxs)("div", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsxs)("select", { required: true, name: "user", value: user === null || user === void 0 ? void 0 : user.id, onChange: onUserSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a User" }), renderUsers()] }), user ? showUserDetails() : null, (0, jsx_runtime_1.jsx)("button", { className: "cancel", onClick: handleSubmit, children: "Delete User" })] })] }));
};
exports.default = DeleteUser;
