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
var restaurantApi_1 = require("../../../state/apis/mealProgramApi/restaurantApi");
var authApi_1 = require("../../../state/apis/authApi");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var EditRestaurant = function () {
    var _a = __read((0, react_1.useState)(''), 2), restaurant = _a[0], setRestaurant = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), name = _b[0], setName = _b[1];
    var _c = __read((0, react_1.useState)(''), 2), salesforceId = _c[0], setSalesforceId = _c[1];
    var _d = __read((0, react_1.useState)(''), 2), userId = _d[0], setUserId = _d[1];
    var _e = __read((0, restaurantApi_1.useEditRestaurantMutation)(), 1), editRestaurant = _e[0];
    var restaurants = (0, restaurantApi_1.useGetAllRestaurantsQuery)().data;
    var users = (0, authApi_1.useGetAllUsersQuery)().data;
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleSubmit = function (e) {
        e.preventDefault();
        editRestaurant({
            restaurantId: restaurant,
            name: name,
            salesforceId: salesforceId,
            userId: userId,
        }).then(function () {
            dispatch((0, alertSlice_1.setAlert)('Restaurant Edited'));
            setRestaurant('');
            setName('');
            setSalesforceId('');
            setUserId('');
        });
    };
    var renderRestaurants = function () {
        if (restaurants) {
            return Object.values(restaurants).map(function (u) {
                return ((0, jsx_runtime_1.jsx)("option", { value: u.id, children: u.name }, u.id));
            });
        }
    };
    var onRestaurantSelect = function (e) {
        setRestaurant(e.target.value);
        if (restaurants) {
            var rest = restaurants[e.target.value];
            if (rest) {
                setName(rest.name);
                setSalesforceId(rest.salesforceId);
                setUserId(rest.user);
            }
            else {
                setRestaurant('');
                setName('');
                setSalesforceId('');
                setUserId('');
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Edit a Restaurant" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsxs)("select", { name: "restaurant", value: restaurant, onChange: onRestaurantSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a Restaurant" }), renderRestaurants()] }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Restaurant Name:" }), (0, jsx_runtime_1.jsx)("input", { name: "name", type: "text", value: name, required: true, onChange: function (e) { return setName(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "SFID", children: "Salesforce ID:" }), (0, jsx_runtime_1.jsx)("input", { name: "SFID", type: "text", value: salesforceId, required: true, onChange: function (e) { return setSalesforceId(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "user", children: "User:" }), (0, jsx_runtime_1.jsxs)("select", { required: true, value: userId, name: "user", onChange: function (e) { return setUserId(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a User" }), !!users &&
                                Object.values(users)
                                    .sort(function (a, b) { return (a.username > b.username ? 1 : -1); })
                                    .map(function (u) {
                                    return ((0, jsx_runtime_1.jsx)("option", { value: u.id, children: u.username }, u.id));
                                })] }), (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = EditRestaurant;
