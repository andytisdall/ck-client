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
var successMessage = "Thank you for you valuable feedback about the CK meal program.";
var Survey = function () {
    var _a = __read((0, react_1.useState)(""), 2), mealName = _a[0], setMealName = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), location = _b[0], setLocation = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), taste = _c[0], setTaste = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), size = _d[0], setSize = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), type = _e[0], setType = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), ingredients = _f[0], setIngredients = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), days = _g[0], setDays = _g[1];
    var _h = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _h[0], isLoading = _h[1].isLoading;
    var _j = __read((0, react_router_dom_1.useSearchParams)(), 1), searchParams = _j[0];
    var navigate = (0, react_router_dom_2.useNavigate)();
    var onSubmit = function (e) {
        e.preventDefault();
        // const phone = searchParams.get('phone');
        // submitForm({
        //   formData: {
        //     mealName,
        //     location,
        //     taste,
        //     size,
        //     type,
        //     ingredients,
        //     days,
        //     phone: phone || undefined,
        //   },
        //   name: 'MEAL_SURVEY',
        // })
        //   .unwrap()
        //   .then(() => {
        //     navigate('/forms/form-sent', { state: { message: successMessage } });
        //   });
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("div", { className: "form-item", children: (0, jsx_runtime_1.jsx)("h1", { children: "Community Kitchens Meal Survey" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "mealName", children: "Please tell us the name of your meal:" }), (0, jsx_runtime_1.jsx)("input", { id: "mealName", type: "text", value: mealName, onChange: function (e) { return setMealName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "location", children: "Please tell us the location you received it:" }), (0, jsx_runtime_1.jsx)("input", { id: "location", type: "text", maxLength: 100, value: location, onChange: function (e) { return setLocation(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "On a scale of 1-5 how would you rate the taste of your meal?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "taste-1", name: "taste", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setTaste("1");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "taste-1", children: "1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "taste-2", name: "taste", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setTaste("2");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "taste-2", children: "2" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "taste-3", name: "taste", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setTaste("3");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "taste-3", children: "3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "taste-4", name: "taste", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setTaste("4");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "taste-4", children: "4" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "taste-5", name: "taste", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setTaste("5");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "taste-5", children: "5" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "On a scale of 1-5 how would you rate the size of your meal?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "size-1", name: "size", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setSize("1");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "size-1", children: "1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "size-2", name: "size", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setSize("2");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "size-2", children: "2" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "size-3", name: "size", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setSize("3");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "size-3", children: "3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "size-4", name: "size", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setSize("4");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "size-4", children: "4" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: "size-5", name: "size", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setSize("5");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "size-5", children: "5" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "type", children: "What types of meals would you like to have?" }), (0, jsx_runtime_1.jsx)("input", { id: "type", value: type, type: "text", onChange: function (e) { return setType(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "ingredients", children: "Are there any particular ingredients you\u2019d like to see?" }), (0, jsx_runtime_1.jsx)("input", { id: "ingredients", value: ingredients, type: "text", onChange: function (e) { return setIngredients(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "days", children: "How many days a week do you access meals from Town Fridges?" }), (0, jsx_runtime_1.jsx)("input", { id: "days", value: days, type: "number", onChange: function (e) { return setDays(e.target.value); } })] }), !isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {})] }));
};
exports.default = Survey;
