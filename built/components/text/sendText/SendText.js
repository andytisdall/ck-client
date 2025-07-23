"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var date_fns_1 = require("date-fns");
var renderWithFallback_1 = __importDefault(require("../../reusable/loading/renderWithFallback"));
require("./SendText.css");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var FileInput_1 = __importDefault(require("../../reusable/file/FileInput"));
var sendTextApi_1 = require("../../../state/apis/textApi/sendTextApi");
var textApi_1 = require("../../../state/apis/textApi");
var TextPreview = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./TextPreview")); }); });
var SendText = function () {
    var _a = __read((0, react_1.useState)(), 2), fridge = _a[0], setFridge = _a[1];
    var _b = __read((0, react_1.useState)(25), 2), mealCount = _b[0], setMealCount = _b[1];
    var _c = __read((0, react_1.useState)((0, date_fns_1.format)(new Date(), "yyyy-MM-dd")), 2), date = _c[0], setDate = _c[1];
    var _d = __read((0, react_1.useState)((0, date_fns_1.format)(new Date(), "HH:mm")), 2), time = _d[0], setTime = _d[1];
    var _e = __read((0, react_1.useState)("CK Home Chef Volunteers"), 2), source = _e[0], setSource = _e[1];
    var _f = __read((0, react_1.useState)(false), 2), imageError = _f[0], setImageError = _f[1];
    var _g = __read((0, react_1.useState)(""), 2), name = _g[0], setName = _g[1];
    var _h = __read((0, react_1.useState)(undefined), 2), photo = _h[0], setPhoto = _h[1];
    var _j = __read((0, react_1.useState)(""), 2), dietary = _j[0], setDietary = _j[1];
    var _k = __read((0, react_1.useState)(false), 2), preview = _k[0], setPreview = _k[1];
    var fridgeQuery = (0, sendTextApi_1.useGetFridgesQuery)();
    var fridges = fridgeQuery.data;
    var _l = __read((0, textApi_1.useSendTextMutation)({
        fixedCacheKey: "sent-text",
    }), 2), sendText = _l[0], sendTextResult = _l[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var getAddress = function () {
        if (fridges && fridge !== undefined && fridges[fridge].location) {
            return ", at ".concat(fridges[fridge].location, ",");
        }
        else {
            return "";
        }
    };
    var getDietaryInfo = function () {
        if (dietary) {
            return "This meal is ".concat(dietary, ". ");
        }
        else {
            return "";
        }
    };
    var message = fridge !== undefined
        ? "Hello! ".concat(!!fridges && fridges[fridge].name, " Town Fridge").concat(getAddress(), " has been stocked with ").concat(mealCount, " meals on ").concat((0, date_fns_1.format)(new Date("".concat(date, " ").concat(time)), "M/d 'at' h:mm a"), ", made with love by ").concat(source, "! Please take only what you need, and leave the rest to share. The meal today is ").concat(name, ". ").concat(getDietaryInfo(), "Please respond to this message with any feedback. Enjoy!")
        : undefined;
    var renderPhoto = function () {
        if (imageError) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "send-text-small-photo", children: (0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-error", children: "Photo URL is not a valid image" }) }));
        }
        if (photo) {
            var src = "";
            if (typeof photo === "string") {
                src = photo;
            }
            else {
                src = URL.createObjectURL(photo);
            }
            return ((0, jsx_runtime_1.jsx)("div", { className: "send-text-small-photo", children: (0, jsx_runtime_1.jsx)("img", { onError: function () { return setImageError(true); }, src: src, alt: "meal" }) }));
        }
    };
    var composeText = function () {
        var btnActive = fridge !== undefined &&
            date &&
            message &&
            time &&
            source &&
            name &&
            mealCount > 0 &&
            !(photo && imageError);
        return ((0, jsx_runtime_1.jsx)("div", { className: "send-text", children: (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables", children: [(0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "date", children: "Date:" }), (0, jsx_runtime_1.jsx)("input", { required: true, name: "date", type: "date", onChange: function (e) { return setDate(e.target.value); }, value: date })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "time", children: "Time:" }), (0, jsx_runtime_1.jsx)("input", { className: "send-text-time", required: true, name: "time", type: "time", onChange: function (e) { return setTime(e.target.value); }, value: time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "fridge", children: "Town Fridge Location:" }), (0, jsx_runtime_1.jsxs)("select", { required: true, name: "fridge", value: fridge, onChange: function (e) { return setFridge(parseInt(e.target.value)); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a Town Fridge" }), fridges === null || fridges === void 0 ? void 0 : fridges.map(function (f, i) { return ((0, jsx_runtime_1.jsx)("option", { value: i, children: f.name }, f.name)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fridge", children: [fridge !== undefined && fridges && ((0, jsx_runtime_1.jsxs)("div", { className: "fridge-info", children: [(0, jsx_runtime_1.jsx)("div", { className: "fridge-info-label", children: "Address: " }), fridges[fridge].location] })), fridge !== undefined && fridges && ((0, jsx_runtime_1.jsxs)("div", { className: "fridge-info", children: [(0, jsx_runtime_1.jsx)("div", { className: "fridge-info-label", children: "Region: " }), fridges[fridge].region] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Name of Meal:" }), (0, jsx_runtime_1.jsx)("textarea", { value: name, name: "name", onChange: function (e) { return setName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "mealCount", children: "Number of Meals:" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: mealCount, name: "mealCount", onChange: function (e) { return setMealCount(parseInt(e.target.value)); }, min: 1 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "source", children: "Prepared By:" }), (0, jsx_runtime_1.jsx)("textarea", { value: source, name: "source", onChange: function (e) { return setSource(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "dietary", children: "Dietary Information (optional):" }), (0, jsx_runtime_1.jsx)("textarea", { value: dietary, name: "dietary", onChange: function (e) { return setDietary(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-variables-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Photo (Optional):" }), (0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-container", children: (0, jsx_runtime_1.jsx)(FileInput_1.default, { file: typeof photo === "string" ? undefined : photo, setFile: setPhoto, label: "Upload Photo:" }) }), (0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-or", children: "Or" }), (0, jsx_runtime_1.jsxs)("div", { className: "send-text-photo-field-container", children: [(0, jsx_runtime_1.jsx)("label", { children: "Paste Photo URL:" }), (0, jsx_runtime_1.jsx)("input", { className: "send-text-photo-field ".concat(imageError && "send-text-photo-field-error"), value: !photo ? "" : photo instanceof File ? "" : photo, onChange: function (e) {
                                            setImageError(false);
                                            setPhoto(e.target.value);
                                        } }), !!photo && typeof photo === "string" && ((0, jsx_runtime_1.jsx)("div", { className: "send-text-photo-field-clear", onClick: function () {
                                            setPhoto("");
                                            setImageError(false);
                                        }, children: "X" }))] })] }), renderPhoto(), (0, jsx_runtime_1.jsx)("button", { className: "send-btn ".concat(btnActive ? "" : "btn-inactive"), onClick: function () {
                            if (btnActive) {
                                setPreview(true);
                            }
                        }, children: "Preview Message" })] }) }));
    };
    var renderContent = function () {
        if (!fridges || sendTextResult.isLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (!preview) {
            return composeText();
        }
        if (message && fridge !== undefined && fridges[fridge].region) {
            return (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(TextPreview, { message: message, region: fridges[fridge].region, photo: photo, onSubmit: function () {
                    sendText({ message: message, region: fridges[fridge].region, photo: photo })
                        .unwrap()
                        .then(function () { return navigate("../text-success"); });
                }, onCancel: function () { return setPreview(false); } }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Send a Text" }), renderContent()] }));
};
exports.default = SendText;
