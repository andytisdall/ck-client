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
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var D4J_SCREENS = {
    Restaurants: {
        RestaurantHome: undefined,
        RestaurantDetail: "id",
        RestaurantMap: "id",
    },
    Events: { EventsHome: undefined, EventDetail: "id" },
    Rewards: { RewardsHome: undefined, GetContact: undefined },
};
var NotificationForm = function (_a) {
    var onSubmit = _a.onSubmit, isLoading = _a.isLoading;
    var _b = __read((0, react_1.useState)(""), 2), title = _b[0], setTitle = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), message = _c[0], setMessage = _c[1];
    var _d = __read((0, react_1.useState)(), 2), screen = _d[0], setScreen = _d[1];
    var _e = __read((0, react_1.useState)(), 2), subScreen = _e[0], setSubScreen = _e[1];
    var _f = __read((0, react_1.useState)(""), 2), paramsValue = _f[0], setParamsValue = _f[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleSubmit = function () {
        var _a;
        var paramsKey = 
        //@ts-ignore
        screen && subScreen ? D4J_SCREENS[screen][subScreen] : undefined;
        onSubmit({
            title: title,
            message: message,
            screen: screen,
            subScreen: subScreen,
            params: paramsKey ? (_a = {}, _a[paramsKey] = paramsValue, _a) : undefined,
        })
            .unwrap()
            .then(function () {
            dispatch((0, alertSlice_1.setAlert)("Notification Sent"));
            setTitle("");
            setMessage("");
        });
    };
    var renderSetScreenSelect = function () {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Screen:" }), (0, jsx_runtime_1.jsxs)("select", { value: screen, onChange: function (e) {
                        var scr = e.target.value;
                        //@ts-ignore
                        setScreen(scr);
                        setParamsValue("");
                    }, children: [(0, jsx_runtime_1.jsx)("option", { value: undefined, children: "Select a Screen" }), Object.keys(D4J_SCREENS).map(function (scr) { return ((0, jsx_runtime_1.jsx)("option", { value: scr, children: scr }, scr)); })] })] }));
    };
    var renderSubScreenSelect = function () {
        if (screen && D4J_SCREENS[screen]) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Sub-Screen (optional):" }), (0, jsx_runtime_1.jsxs)("select", { value: subScreen, onChange: function (e) {
                            var scr = e.target.value;
                            //@ts-ignore
                            setSubScreen(scr);
                        }, children: [(0, jsx_runtime_1.jsx)("option", { value: undefined, children: "Select a Sub-Screen" }), Object.keys(D4J_SCREENS[screen]).map(function (scr) { return ((0, jsx_runtime_1.jsx)("option", { value: scr, children: scr }, scr)); })] })] }));
        }
    };
    var renderParamsSelect = function () {
        //@ts-ignore
        if (screen && subScreen && D4J_SCREENS[screen][subScreen]) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { children: 
                        //@ts-ignore
                        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: D4J_SCREENS[screen][subScreen] }) }), (0, jsx_runtime_1.jsx)("input", { value: paramsValue, onChange: function (e) { return setParamsValue(e.target.value); } })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { children: "Title:" }), (0, jsx_runtime_1.jsx)("input", { value: title, onChange: function (e) { return setTitle(e.target.value); }, maxLength: 40 }), (0, jsx_runtime_1.jsx)("label", { children: "Message:" }), (0, jsx_runtime_1.jsx)("textarea", { value: message, onChange: function (e) { return setMessage(e.target.value); }, maxLength: 150 }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Optional- navigate user to screen when they press the notification:" }), renderSetScreenSelect(), renderSubScreenSelect(), renderParamsSelect(), isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "button cancel", onClick: handleSubmit, children: "Send Notification" }))] }));
};
exports.default = NotificationForm;
