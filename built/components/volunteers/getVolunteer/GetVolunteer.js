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
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
require("../Volunteers.css");
var EnterEmail_1 = __importDefault(require("./EnterEmail"));
var EnterName_1 = __importDefault(require("./EnterName"));
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var GetVolunteer = function () {
    var _a = __read((0, react_1.useState)(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read((0, react_1.useState)(false), 2), showNameFields = _b[0], setShowNameFields = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), firstName = _c[0], setFirstName = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), lastName = _d[0], setLastName = _d[1];
    var _e = __read((0, volunteerApi_1.useLazyGetVolunteerQuery)(), 2), getVolunteer = _e[0], getVolunteerResult = _e[1];
    var _f = __read((0, volunteerApi_1.useCreateVolunteerMutation)(), 2), createVolunteer = _f[0], createVolunteerResult = _f[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!showNameFields) {
            getVolunteer(email)
                .unwrap()
                .then(function (volunteer) {
                if (!volunteer) {
                    setShowNameFields(true);
                }
            });
        }
        else {
            createVolunteer({ email: email, firstName: firstName, lastName: lastName }).unwrap();
        }
    };
    var displayEmail = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-email-display volunteers-signin-field", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Email:" }), (0, jsx_runtime_1.jsx)("p", { children: email }), (0, jsx_runtime_1.jsx)("p", { className: "retro-link text-small", onClick: function () { return setShowNameFields(false); }, children: "Use a different email address" })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signin", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Thanks for signing up to volunteer! Please enter your information so you can sign up." }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [showNameFields ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [displayEmail(), (0, jsx_runtime_1.jsx)(EnterName_1.default, { firstName: firstName, lastName: lastName, setFirstName: setFirstName, setLastName: setLastName })] })) : ((0, jsx_runtime_1.jsx)(EnterEmail_1.default, { email: email, setEmail: setEmail })), getVolunteerResult.isLoading || createVolunteerResult.isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }))] })] }));
};
exports.default = GetVolunteer;
