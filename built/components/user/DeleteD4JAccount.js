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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
require("../Home.css");
require("../auth/SignedOut/SignIn.css");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var d4jApi_1 = require("../../state/apis/d4jApi");
var DeleteD4JAccount = function () {
    var _a = __read((0, react_1.useState)(''), 2), code = _a[0], setCode = _a[1];
    var email = (0, react_router_dom_1.useParams)().email;
    var _b = __read((0, d4jApi_1.useLazyGenerateDeleteAccountCodeQuery)(), 2), generateCode = _b[0], _c = _b[1], generateCodeError = _c.isError, codeGenerationIsLoading = _c.isLoading, codeGenerated = _c.isSuccess;
    var _d = __read((0, d4jApi_1.useVerifyDeleteAccountCodeMutation)(), 2), verifyCode = _d[0], _e = _d[1], codeVerificationIsLoading = _e.isLoading, codeVerified = _e.isSuccess, verifyCodeError = _e.isError;
    var renderSuccess = function () {
        return (0, jsx_runtime_1.jsx)("p", { children: "You have successfully deleted your account." });
    };
    var renderCodeInput = function () {
        if (email) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "You have been emailed a code. Please enter the code here to remove your info from CK's database." }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "code", children: "Code:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: code, id: "code", onChange: function (e) { return setCode(e.target.value); } }), codeVerificationIsLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return verifyCode({ code: code, email: email }); }, children: "Delete My Data" }))] }));
        }
    };
    var renderGenerateCode = function () {
        if (email) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "To delete your data, click below." }), (0, jsx_runtime_1.jsxs)("h5", { children: ["Email: ", email] }), codeGenerationIsLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return generateCode(email); }, children: "Delete My Data" }))] }));
        }
    };
    var renderForm = function () {
        if (generateCodeError) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "No user data found for email:" }), " ", (0, jsx_runtime_1.jsx)("h5", { children: email })] }));
        }
        if (verifyCodeError) {
            return (0, jsx_runtime_1.jsx)("p", { children: "Incorrect code" });
        }
        if (!codeGenerated) {
            return renderGenerateCode();
        }
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Delete Account Data" }), (0, jsx_runtime_1.jsxs)("h5", { children: ["Email: ", email] }), codeVerified ? renderSuccess() : renderCodeInput()] }));
    };
    return (0, jsx_runtime_1.jsx)("div", { className: "main user", children: renderForm() });
};
exports.default = DeleteD4JAccount;
