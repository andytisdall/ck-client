"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var errorSlice_1 = require("../../state/apis/slices/errorSlice");
var formApi_1 = require("../../state/apis/formApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var programRequirements = {
    eighteen: false,
    eligible: false,
    available: false,
    able: false,
    english: false,
    transportation: false,
};
var CulinaryTraining = function () {
    var _a = __read((0, react_1.useState)(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), firstName = _b[0], setFirstName = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), lastName = _c[0], setLastName = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), address = _d[0], setAddress = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), phone = _e[0], setPhone = _e[1];
    var _f = __read((0, react_1.useState)(), 2), internet = _f[0], setInternet = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), description = _g[0], setDescription = _g[1];
    var _h = __read((0, react_1.useState)(""), 2), source = _h[0], setSource = _h[1];
    var _j = __read((0, react_1.useState)(programRequirements), 2), requirements = _j[0], setRequirements = _j[1];
    var _k = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _k[0], isLoading = _k[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var onSubmit = function (e) {
        e.preventDefault();
        if (internet === undefined) {
            return dispatch((0, errorSlice_1.setError)("Please fill out every question before submitting"));
        }
        if (!Object.values(requirements).every(function (r) { return r; })) {
            return dispatch((0, errorSlice_1.setError)("You must meet all program requirements to apply"));
        }
        submitForm({
            formData: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                address: address,
                internet: internet,
                description: description,
                source: source,
            },
            name: "CULINARY_TRAINING",
        })
            .unwrap()
            .then(function () {
            navigate("/forms/form-sent", {
                state: {
                    message: "Thanks for submitting your information! We will get in touch with you to discuss your application.",
                },
            });
        });
    };
    var header = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Community Kitchens Culinary Training Application" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "Thank you for your interest in the CK Culinary Training Program!" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "The CK Culinary Training Program provides 8-weeks of culinary education to participants through training and hands-on experience in order to build a broad range of skills for employment in the food and hospitality sector. During the first 6-weeks of the Program, CK trains participants at the CK Central Kitchen on kitchen operations, knife skills, food safety, proper food handling & storage techniques, various cooking methods, following large-scale recipes and standards of professional behavior. During the last 2-weeks/48 hours of training, interns are partnered with food service businesses who are willing to provide hands-on work experience to participants. The CK Culinary Training Program includes career readiness support and job placement assistance within CK\u2019s extensive network of Oakland restaurant partners." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("strong", { children: "Program Details" }) }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Compensation: " }), "$20/hour stipend - 24 hours/week for 8 weeks"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Culinary Training Dates: " }), "August 11 - Sept. 19, 2025, Community Kitchens Central Kitchen, 2270 Telegraph Ave, Oakland"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Schedule: " }), "Monday - Friday, 5:00 - 9:00 PM (led by a bilingual chef - Spanish & English)"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Career Readiness + Homework: " }), "4 Hours"] }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("strong", { children: "Individual internship location and schedule TBD" }) })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["Please reach out to Mollye Chuacoff at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:mollye@ckoakland.org", className: "retro-link", children: "mollye@ckoakland.org" }), " ", "with any questions. We are looking forward to reviewing your application!"] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["Best, Mollye Chudacoff", (0, jsx_runtime_1.jsx)("br", {}), "Sr. Program & Volunteer Manager", (0, jsx_runtime_1.jsx)("br", {}), "Community Kitchens", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("a", { href: "ckoakland.org/volunteer", className: "retro-link", children: "ckoakland.org/volunteer" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { className: "required", children: "* Indicates required question" })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header(), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["First Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Last Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", value: lastName, onChange: function (e) { return setLastName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Email", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Mailing Address", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: address, onChange: function (e) { return setAddress(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Phone Number", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", value: phone, onChange: function (e) { return setPhone(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Please check the boxes below to indicate that you meet each of the following program requirements: ", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { eighteen: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I am at least 18 years of age" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { eligible: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I am legally eligible to work in the United States" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { available: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I am available to attend during the designated hours for the entirety of the program: August 11 - September 12" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { able: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I am able to stand up to 4 hours and lift up to 25 lbs" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { english: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I have basic understanding of English to follow instructions." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", onChange: function (e) {
                                            return setRequirements(function (current) { return (__assign(__assign({}, current), { transportation: e.target.checked })); });
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "I have reliable transportation for the duration of the program, including access to public transportation." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Do you have access to a computer and reliable internet?", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "internet", onChange: function (e) {
                                            if (e.target.checked) {
                                                setInternet(true);
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "Yes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "internet", onChange: function (e) {
                                            if (e.target.checked) {
                                                setInternet(false);
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { children: "No (I would like to use computer facilities at Community Kitchens Central Kitchen)" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Tell us a bit about yourself, why you're interested in the CK Culinary Training Program, and what goals you have for the future.", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("textarea", { value: description, onChange: function (e) { return setDescription(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["How did you hear about this program?", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: source, onChange: function (e) { return setSource(e.target.value); } })] }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = CulinaryTraining;
