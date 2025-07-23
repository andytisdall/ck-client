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
var formApi_1 = require("../../../state/apis/formApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var HomeChefRegistration = function () {
    var _a = __read((0, react_1.useState)(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), firstName = _b[0], setFirstName = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), lastName = _c[0], setLastName = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), phone = _d[0], setPhone = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), source = _e[0], setSource = _e[1];
    var _f = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _f[0], isLoading = _f[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) {
        e.preventDefault();
        // submitForm({
        //   formData: {
        //     email,
        //     firstName,
        //     lastName,
        //     phone,
        //     source,
        //   },
        //   name: "HOME_CHEF_REGISTRATION",
        // })
        //   .unwrap()
        //   .then(() => {
        //     navigate("/forms/form-sent", {
        //       state: { message: "You will receive a confirmation email." },
        //     });
        //   });
    };
    var header = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("h1", { children: "In-Person Home Chef Training" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "Thanks for signing up for the Home Chef Training at the CK Central Kitchen located at 2270 Telegraph Ave on TUESDAY, 10/29 from 5:30-7:30 PM!" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "Join us as the amazing Melinda Drayton, a seasoned Home Chef, guides us in whipping up her beloved family recipe\u2014Cowgirl Chili and Maple Butter Cornbread\u2014to share with our community through Town Fridges." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "This is your chance to roll up your sleeves and gain hands-on experience cooking for 25+ people. Bring your family and friends along to learn how to cook in large batches while having a blast together, sip on some wine and beer and enjoy the meal together!" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "As a Home Chef, you\u2019ll be part of a heartwarming mission, donating home-cooked meals made with love to Town Fridges in neighborhoods facing food insecurity. Home Chef Volunteers cook 15-25 meals at home with family and friends, procure ingredients and deliver to Town Fridges where anyone can take a meal for free 24/7. CK provides packaging, labels, local restaurant recipes, supplemental produce and a tax deductible annual In-Kind Gift Donation receipt." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["We can\u2019t wait to see you there! If you have any questions, feel free to reach out at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:mollye@ckoakland.org", children: "mollye@ckoakland.org." })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "Let\u2019s make a difference together\u2014see you soon! \uD83C\uDF1F" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { className: "required", children: "* Indicates required question" })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header(), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Email", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["First Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Last Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", value: lastName, onChange: function (e) { return setLastName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Phone Number" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: phone, onChange: function (e) { return setPhone(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "How did you hear about the CK Home Chef program?" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: source, onChange: function (e) { return setSource(e.target.value); } })] }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = HomeChefRegistration;
