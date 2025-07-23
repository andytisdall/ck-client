"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var formApi_1 = require("../../../state/apis/formApi");
var VolunteerFormHeader_1 = __importDefault(require("./VolunteerFormHeader"));
var successMessage = "A Community Kitchens staff member will be in touch with you. Thanks for helping out!";
var InterestForm = function () {
    var _a = __read((0, react_1.useState)(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), firstName = _b[0], setFirstName = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), lastName = _c[0], setLastName = _c[1];
    var _d = __read((0, react_1.useState)(""), 2), phoneNumber = _d[0], setPhoneNumber = _d[1];
    var _e = __read((0, react_1.useState)(""), 2), instagramHandle = _e[0], setInstagramHandle = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), source = _f[0], setSource = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), corporate = _g[0], setCorporate = _g[1];
    var _h = __read((0, react_1.useState)(""), 2), extraInfo = _h[0], setExtraInfo = _h[1];
    var _j = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _j[0], isLoading = _j[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, submitForm({
                            formData: {
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                phoneNumber: phoneNumber,
                                instagramHandle: instagramHandle,
                                corporate: corporate,
                                source: source,
                                extraInfo: extraInfo,
                            },
                            name: "VOLUNTEER_INTEREST",
                        })];
                case 1:
                    _a.sent();
                    navigate("/forms/form-sent", { state: { message: successMessage } });
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(VolunteerFormHeader_1.default, {}), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "email", children: ["Email", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { id: "email", type: "email", required: true, value: email, maxLength: 200, onChange: function (e) { return setEmail(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "firstName", children: ["First Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { id: "firstName", type: "text", required: true, maxLength: 40, value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "lastName", children: ["Last Name", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { id: "lastName", type: "text", required: true, maxLength: 80, value: lastName, onChange: function (e) { return setLastName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "phoneNumber", children: ["Phone Number", (0, jsx_runtime_1.jsx)("span", { className: "required", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { id: "phoneNumber", type: "tel", required: true, maxLength: 10, value: phoneNumber, onChange: function (e) { return setPhoneNumber(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "instagramHandle", children: "Instagram Handle" }), (0, jsx_runtime_1.jsx)("input", { id: "instagramHandle", type: "text", maxLength: 40, value: instagramHandle, onChange: function (e) { return setInstagramHandle(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "corporate", children: ["Are you interested in organizing a volunteer day for a corporate or community group at the CK Kitchen? We'd love to host you! Please provide the name of your organization or group below, and email Mollye at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:mollye@ckoakland.org", className: "retro-link", children: "mollye@ckoakland.org" }), " ", "for more information and scheduling."] }), (0, jsx_runtime_1.jsx)("input", { id: "corporate", value: corporate, onChange: function (e) { return setCorporate(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "source", children: "How did you hear about Community Kitchens?" }), (0, jsx_runtime_1.jsx)("input", { id: "source", maxLength: 200, type: "text", value: source, onChange: function (e) { return setSource(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "extraInfo", children: "Anything else you would like us to know?" }), (0, jsx_runtime_1.jsx)("input", { id: "extraInfo", maxLength: 1000, type: "text", value: extraInfo, onChange: function (e) { return setExtraInfo(e.target.value); } })] }), !isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {})] })] }));
};
exports.default = InterestForm;
