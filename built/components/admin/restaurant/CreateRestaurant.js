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
var restaurantApi_1 = require("../../../state/apis/mealProgramApi/restaurantApi");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var CreateRestaurant = function () {
    var _a = __read((0, react_1.useState)(''), 2), name = _a[0], setName = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), salesforceId = _b[0], setSalesforceId = _b[1];
    var _c = __read((0, react_1.useState)(''), 2), userId = _c[0], setUserId = _c[1];
    var users = (0, authApi_1.useGetAllUsersQuery)().data;
    var _d = __read((0, restaurantApi_1.useCreateRestaurantMutation)(), 1), createRestaurant = _d[0];
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleSubmit = function (e) {
        e.preventDefault();
        createRestaurant({ name: name, salesforceId: salesforceId, userId: userId }).then(function () {
            dispatch((0, alertSlice_1.setAlert)('Restaurant Created'));
            setName('');
            setSalesforceId('');
            setUserId('');
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Create a Restaurant" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Restaurant Name:" }), (0, jsx_runtime_1.jsx)("input", { name: "name", type: "text", value: name, required: true, onChange: function (e) { return setName(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "SFID", children: "Salesforce ID:" }), (0, jsx_runtime_1.jsx)("input", { name: "SFID", type: "text", value: salesforceId, required: true, onChange: function (e) { return setSalesforceId(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "user", children: "User:" }), (0, jsx_runtime_1.jsxs)("select", { required: true, value: userId, name: "user", onChange: function (e) { return setUserId(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a User" }), !!users &&
                                Object.values(users)
                                    .sort(function (a, b) { return (a.username > b.username ? 1 : -1); })
                                    .map(function (u) {
                                    return ((0, jsx_runtime_1.jsx)("option", { value: u.id, children: u.username }, u.id));
                                })] }), (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = CreateRestaurant;
