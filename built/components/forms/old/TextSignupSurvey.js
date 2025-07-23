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
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var formApi_1 = require("../../../state/apis/formApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var successMessage = "Thank you for you giving us some information about yourself.";
var TextSignupSurvey = function () {
    var _a = __read((0, react_1.useState)(""), 2), age = _a[0], setAge = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), ethnicity = _b[0], setEthnicity = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), zip = _c[0], setZip = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), mixedRace = _d[0], setMixedRace = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), otherEth = _e[0], setOtherEth = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), type = _f[0], setType = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), ingredients = _g[0], setIngredients = _g[1];
    var _h = __read((0, react_1.useState)(""), 2), days = _h[0], setDays = _h[1];
    var mixedRefBox = (0, react_1.useRef)(null);
    var mixedRefText = (0, react_1.useRef)(null);
    var otherRefBox = (0, react_1.useRef)(null);
    var otherRefText = (0, react_1.useRef)(null);
    var phone = (0, react_router_dom_1.useParams)().phone;
    var navigate = (0, react_router_dom_2.useNavigate)();
    var _j = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _j[0], isLoading = _j[1].isLoading;
    var onSubmit = function (e) {
        e.preventDefault();
        // submitForm({
        //   formData: {
        //     age,
        //     ethnicity,
        //     zip,
        //     type,
        //     ingredients,
        //     days,
        //     phone,
        //   },
        //   name: 'TEXT_SIGNUP_SURVEY',
        // })
        //   .unwrap()
        //   .then(() => {
        //     navigate('/forms/form-sent', { state: { message: successMessage } });
        //   });
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("div", { className: "form-item", children: (0, jsx_runtime_1.jsx)("h1", { children: "Community Kitchens Survey" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "What is your age?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "age-1", name: "age", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setAge("0-17");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "age-1", children: "0 - 17" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "age-2", name: "age", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setAge("18-26");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "age-2", children: "18 - 26" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "age-3", name: "age", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setAge("27-50");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "age-3", children: "27 - 50" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "age-4", name: "age", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setAge("50-60");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "age-4", children: "50 - 60" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "age-5", name: "age", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setAge("60+");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "age-5", children: "60+" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "What is your ethnicity?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-1", name: "ethnicity", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEthnicity("African American/Black");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-1", children: "African American / Black" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-2", name: "ethnicity", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEthnicity("Asian/Pacific Islander");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-2", children: "Asian / Pacific Islander" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-3", name: "ethnicity", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEthnicity("Latina/Latino");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-3", children: "Latina / Latino" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-4", name: "ethnicity", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEthnicity("Native American/American Indian");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-4", children: "Native American / American Indian" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-5", name: "ethnicity", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEthnicity("White/Caucasian");
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-5", children: "White / Caucasian" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-6", name: "ethnicity", type: "radio", ref: mixedRefBox, onChange: function (e) {
                                    if (e.target.checked && mixedRefText.current) {
                                        mixedRefText.current.focus();
                                        setEthnicity(mixedRace);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-6", children: "Mixed Race:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", ref: mixedRefText, value: mixedRace, onFocus: function () {
                                    if (mixedRefBox.current) {
                                        mixedRefBox.current.checked = true;
                                    }
                                }, onChange: function (e) {
                                    setMixedRace(e.target.value);
                                    setEthnicity(e.target.value);
                                } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "ethnicity-7", name: "ethnicity", type: "radio", ref: otherRefBox, onChange: function (e) {
                                    if (e.target.checked && otherRefText.current) {
                                        otherRefText.current.focus();
                                        setEthnicity(otherEth);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ethnicity-7", children: "Other:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", ref: otherRefText, value: otherEth, onFocus: function () {
                                    if (otherRefBox.current) {
                                        otherRefBox.current.checked = true;
                                    }
                                }, onChange: function (e) {
                                    setOtherEth(e.target.value);
                                    setEthnicity(e.target.value);
                                } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "zip", children: "What is your zip code?" }), (0, jsx_runtime_1.jsx)("input", { id: "zip", maxLength: 5, value: zip, type: "text", onChange: function (e) { return setZip(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "type", children: "What types of meals would you like to have?" }), (0, jsx_runtime_1.jsx)("input", { id: "type", value: type, type: "text", onChange: function (e) { return setType(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "ingredients", children: "Are there any particular ingredients you\u2019d like to see?" }), (0, jsx_runtime_1.jsx)("input", { id: "ingredients", value: ingredients, type: "text", onChange: function (e) { return setIngredients(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "days", children: "How many days a week do you access meals from Town Fridges?" }), (0, jsx_runtime_1.jsx)("input", { id: "days", value: days, type: "number", onChange: function (e) { return setDays(e.target.value); } })] }), !isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {})] }));
};
exports.default = TextSignupSurvey;
