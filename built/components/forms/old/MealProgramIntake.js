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
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var formApi_1 = require("../../../state/apis/formApi");
var react_router_dom_1 = require("react-router-dom");
var successMessage = "Thank you for giving us some information about your restaurant. Community Kitchens will be in touch with future opportunies to feed the community!";
var MealProgramIntake = function () {
    var _a = __read((0, react_1.useState)(""), 2), name = _a[0], setName = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), address = _b[0], setAddress = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), contactName = _c[0], setContactName = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), contactPosition = _d[0], setContactPosition = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), contactEmail = _e[0], setContactEmail = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), contactNumber = _f[0], setContactNumber = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), date = _g[0], setDate = _g[1];
    var _h = __read((0, react_1.useState)(), 2), bipoc = _h[0], setBipoc = _h[1];
    var _j = __read((0, react_1.useState)(), 2), female = _j[0], setFemale = _j[1];
    var _k = __read((0, react_1.useState)(""), 2), neighborhood = _k[0], setNeighborhood = _k[1];
    var _l = __read((0, react_1.useState)(), 2), hardship = _l[0], setHardship = _l[1];
    var _m = __read((0, react_1.useState)(), 2), ebt = _m[0], setEbt = _m[1];
    var _o = __read((0, react_1.useState)(), 2), deliver = _o[0], setDeliver = _o[1];
    var _p = __read((0, react_1.useState)(""), 2), source = _p[0], setSource = _p[1];
    var _q = __read((0, react_1.useState)(""), 2), food = _q[0], setFood = _q[1];
    var _r = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _r[0], isLoading = _r[1].isLoading;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var neighborhoodList = [
        "Rockridge",
        "Uptown",
        "Grand Lake",
        "Laurel",
        "Fruitvale",
        "Jack London Square",
        "Old Oakland",
        "Temescal",
        "East Oakland",
        "Dimond",
    ];
    var onSubmit = function (e) {
        e.preventDefault();
        // submitForm({
        //   formData: {
        //     name,
        //     contactName,
        //     contactEmail,
        //     contactNumber,
        //     contactPosition,
        //     bipoc: bipoc || false,
        //     female: female || false,
        //     address,
        //     date,
        //     neighborhood,
        //     hardship: hardship || false,
        //     ebt: ebt || false,
        //     deliver: deliver || false,
        //     source,
        //     food,
        //   },
        //   name: "MEAL_PROGRAM_INTAKE",
        // })
        //   .unwrap()
        //   .then(() => {
        //     dispatch(setAlert(successMessage));
        //     navigate("/forms/form-sent");
        //   });
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Community Kitchens Survey" }), (0, jsx_runtime_1.jsx)("p", { children: "Thank you for your interest in becoming a CK restaurant partner! Help us get to know you by filling out the questionnaire below." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "form-title", children: "Restaurant Information:" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Restaurant Name:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "name", type: "text", value: name, onChange: function (e) { return setName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Restaurant Address:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "name", type: "text", value: address, onChange: function (e) { return setAddress(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "date", children: "Date Opened:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "date", type: "date", value: date, onChange: function (e) { return setDate(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "form-title", children: "Contact Information:" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Name:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "name", type: "text", value: contactName, onChange: function (e) { return setContactName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "position", children: "Position:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "position", type: "text", value: contactPosition, onChange: function (e) { return setContactPosition(e.target.value); } })] }), " ", (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email Address:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "email", type: "text", value: contactEmail, onChange: function (e) { return setContactEmail(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "number", children: "Phone Number:" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "number", type: "text", min: 10, max: 10, value: contactNumber, onChange: function (e) { return setContactNumber(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Does the restaurant owner(s) identify as Black, Indigenous, or People of Color (BIPOC)?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "bipoc", id: "bipoc-yes", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setBipoc(true);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "bipoc-yes", children: "Yes" })] }), " ", (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "bipoc", id: "bipoc-no", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setBipoc(false);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "bipoc-no", children: "No" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Is your restaurant fully or partially female-owned?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "female", id: "female-yes", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setFemale(true);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "female-yes", children: "Yes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "female", id: "female-no", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setFemale(false);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "female-no", children: "No" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "form-item", children: (0, jsx_runtime_1.jsxs)("div", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("label", { children: "What neighborhood is your restaurant located in?" }), (0, jsx_runtime_1.jsxs)("select", { value: neighborhood, onChange: function (e) { return setNeighborhood(e.target.value); }, required: true, children: [(0, jsx_runtime_1.jsx)("option", { value: undefined, children: "Select a Neighborhood" }), neighborhoodList.map(function (n) {
                                    return ((0, jsx_runtime_1.jsx)("option", { value: n, children: n }, n));
                                })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Is your restaurant experiencing financial hardship?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "hardship", id: "hardship-yes", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setHardship(true);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "hardship-yes", children: "Yes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "hardship", id: "hardship-no", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setHardship(false);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "hardship-no", children: "No" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Are you interested in accepting EBT/CalFresh at your restaurant?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "ebt", id: "ebt-yes", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEbt(true);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ebt-yes", children: "Yes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "ebt", id: "ebt-no", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setEbt(false);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "ebt-no", children: "No" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Are you able to deliver?" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "deliver", id: "deliver-yes", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setDeliver(true);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "deliver-yes", children: "Yes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { required: true, name: "deliver", id: "deliver-no", type: "radio", onChange: function (e) {
                                    if (e.target.checked) {
                                        setDeliver(false);
                                    }
                                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "deliver-no", children: "No" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "source", children: "How did you hear about Community Kitchens restaurant meal programs?" }), (0, jsx_runtime_1.jsx)("input", { id: "source", type: "text", value: source, onChange: function (e) { return setSource(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "food", children: "In a few words please describe the type of cuisine you serve:" }), (0, jsx_runtime_1.jsx)("input", { id: "food", type: "text", value: food, onChange: function (e) { return setFood(e.target.value); }, required: true })] }), !isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {})] }));
};
exports.default = MealProgramIntake;
