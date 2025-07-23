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
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var TextPreview_1 = __importDefault(require("../sendText/TextPreview"));
require("../sendText/SendText.css");
//@ts-ignore
var Feedback_1 = require("../feedback/Feedback");
var FileInput_1 = __importDefault(require("../../reusable/file/FileInput"));
var textApi_1 = require("../../../state/apis/textApi");
var CustomText = function (_a) {
    var replyTo = _a.replyTo;
    var _b = __read((0, textApi_1.useSendTextMutation)({
        fixedCacheKey: "sent-text",
    }), 2), sendText = _b[0], sendTextResult = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), message = _c[0], setMessage = _c[1];
    var _d = __read((0, react_1.useState)((replyTo === null || replyTo === void 0 ? void 0 : replyTo.region) ? replyTo.region : null), 2), region = _d[0], setRegion = _d[1];
    var _e = __read((0, react_1.useState)((replyTo === null || replyTo === void 0 ? void 0 : replyTo.sender) ? (0, Feedback_1.formatNumber)(replyTo.sender) : ""), 2), number = _e[0], setNumber = _e[1];
    var _f = __read((0, react_1.useState)(), 2), photo = _f[0], setPhoto = _f[1];
    var _g = __read((0, react_1.useState)(false), 2), imageError = _g[0], setImageError = _g[1];
    var _h = __read((0, react_1.useState)(false), 2), preview = _h[0], setPreview = _h[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var numberRef = (0, react_1.useRef)(null);
    var numberTextRef = (0, react_1.useRef)(null);
    var composeText = function () {
        var btnActive = message && (region || number);
        return ((0, jsx_runtime_1.jsx)("div", { className: "send-text", children: (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables", children: [(0, jsx_runtime_1.jsxs)("div", { className: "send-text-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "send-text-section-title", children: "To:" }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-radio", children: [(0, jsx_runtime_1.jsx)("input", { required: true, id: "to-1", name: "to", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setNumber("");
                                                setRegion("EAST_OAKLAND");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "to-1", children: "East Oakland" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-radio", children: [(0, jsx_runtime_1.jsx)("input", { required: true, id: "to-2", name: "to", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setRegion("WEST_OAKLAND");
                                                setNumber("");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "to-2", children: "West Oakland" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-radio", children: [(0, jsx_runtime_1.jsx)("input", { required: true, id: "to-3", name: "to", type: "radio", onChange: function (e) {
                                            if (e.target.checked) {
                                                setRegion("both");
                                                setNumber("");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "to-3", children: "East & West Oakland" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-radio", children: [(0, jsx_runtime_1.jsx)("input", { required: true, id: "to-4", name: "to", type: "radio", ref: numberRef, onChange: function (e) {
                                            if (e.target.checked && numberTextRef.current) {
                                                var ref = numberTextRef.current;
                                                ref.focus();
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "to-4", children: "Phone Number:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: number, ref: numberTextRef, onFocus: function () {
                                            if (numberRef.current) {
                                                numberRef.current.checked = true;
                                            }
                                        }, onChange: function (e) {
                                            setNumber(e.target.value);
                                        } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "send-text-section-title", children: "Message:" }), (0, jsx_runtime_1.jsx)("div", { className: "send-text-variables-item", children: (0, jsx_runtime_1.jsx)("textarea", { required: true, id: "message", onChange: function (e) { return setMessage(e.target.value); }, value: message }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "send-text-section-title", children: "Photo (Optional):" }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-container", children: (0, jsx_runtime_1.jsx)(FileInput_1.default, { file: typeof photo !== "string" ? photo : undefined, setFile: setPhoto, label: "Upload Photo:" }) }), (0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-or", children: "Or" }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-photo-field-container", children: [(0, jsx_runtime_1.jsx)("label", { children: "Paste Photo URL:" }), (0, jsx_runtime_1.jsx)("input", { className: "send-text-photo-field ".concat(imageError && "send-text-photo-field-error"), value: !photo ? "" : typeof photo !== "string" ? "" : photo, onChange: function (e) {
                                                    setImageError(false);
                                                    setPhoto(e.target.value);
                                                } }), !!photo && typeof photo === "string" && ((0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-clear", onClick: function () {
                                                    setPhoto("");
                                                    setImageError(false);
                                                }, children: "X" }))] })] })] }), (0, jsx_runtime_1.jsx)("button", { className: "send-btn ".concat(btnActive ? "" : "btn-inactive"), onClick: function () {
                            if (btnActive) {
                                setPreview(true);
                            }
                        }, children: "Preview Message" })] }) }));
    };
    var renderContent = function () {
        if (sendTextResult.isLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (!preview) {
            return composeText();
        }
        if (region || number) {
            return ((0, jsx_runtime_1.jsx)(TextPreview_1.default, { message: message, region: region || undefined, photo: photo, number: number, onSubmit: function () {
                    if (region || number) {
                        sendText({
                            // region not used because number is included
                            region: region || "EAST_OAKLAND",
                            message: message,
                            photo: photo,
                            feedbackId: replyTo === null || replyTo === void 0 ? void 0 : replyTo.id,
                            number: number,
                        })
                            .unwrap()
                            .then(function () { return navigate("../text-success"); });
                    }
                }, onCancel: function () { return setPreview(false); } }));
        }
    };
    var renderOriginalMessage = function () {
        if (replyTo === null || replyTo === void 0 ? void 0 : replyTo.message) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "send-text-original-message", children: [(0, jsx_runtime_1.jsx)("p", { children: "Original Message:" }), (0, jsx_runtime_1.jsx)("p", { children: replyTo.message })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Send a Text" }), renderOriginalMessage(), renderContent()] }));
};
exports.default = CustomText;
