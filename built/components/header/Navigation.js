"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./Navigation.css");
var authApi_1 = require("../../state/apis/authApi");
var Navigation = function () {
    var userQuery = (0, authApi_1.useGetUserQuery)();
    var user = userQuery.data;
    var NavButton = function (_a) {
        var to = _a.to, text = _a.text;
        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "nav-btn", to: to, children: text }));
    };
    var renderVolunteers = function () {
        return (0, jsx_runtime_1.jsx)(NavButton, { to: "volunteers", text: "CK Volunteers" });
    };
    var renderTextService = function () {
        if ((user === null || user === void 0 ? void 0 : user.admin) || (user === null || user === void 0 ? void 0 : user.busDriver)) {
            return (0, jsx_runtime_1.jsx)(NavButton, { to: "text", text: "Text Service" });
        }
    };
    var renderAdmin = function () {
        if (user === null || user === void 0 ? void 0 : user.admin) {
            return (0, jsx_runtime_1.jsx)(NavButton, { to: "admin", text: "Admin" });
        }
    };
    var renderNoUser = function () {
        return (0, jsx_runtime_1.jsx)("div", { className: "nav-btns", children: renderVolunteers() });
    };
    var renderWithUser = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "nav-btns", children: [renderTextService(), renderVolunteers(), (0, jsx_runtime_1.jsx)(NavButton, { to: "user", text: "User Settings" }), renderAdmin()] }));
    };
    return (0, jsx_runtime_1.jsx)("nav", { children: user ? renderWithUser() : renderNoUser() });
};
exports.default = Navigation;
