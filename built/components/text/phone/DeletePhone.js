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
var SearchPhone_1 = __importDefault(require("./SearchPhone"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var textApi_1 = require("../../../state/apis/textApi");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var DeletePhone = function () {
    var _a = __read((0, react_1.useState)(), 2), number = _a[0], setNumber = _a[1];
    var _b = __read((0, textApi_1.useDeletePhoneMutation)(), 2), deletePhone = _b[0], deletePhoneResult = _b[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var renderDelete = function () {
        if (number) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: number.number.substring(2) }), !deletePhoneResult.isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                    deletePhone(number.id)
                                        .unwrap()
                                        .then(function () {
                                        setNumber(undefined);
                                        dispatch((0, alertSlice_1.setAlert)('Number has been removed'));
                                    });
                                }, className: "cancel", children: "Delete this Number" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setNumber(undefined); }, children: "Cancel" }), ' '] })) : ((0, jsx_runtime_1.jsx)(Loading_1.default, {}))] }));
        }
        else {
            return (0, jsx_runtime_1.jsx)(SearchPhone_1.default, { setSearchResult: setNumber });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "phone-item delete-phone", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Remove a phone number" }), renderDelete()] }));
};
exports.default = DeletePhone;
