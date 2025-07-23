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
var PrizeDrawing_1 = __importDefault(require("./PrizeDrawing"));
var d4jApi_1 = require("../../../state/apis/d4jApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var D4J = function () {
    var _a = __read((0, d4jApi_1.useLazyDeleteAndyQuery)(), 1), deleteAndy = _a[0];
    var data = (0, d4jApi_1.useGetStyleWeekActiveQuery)().data;
    var _b = __read((0, d4jApi_1.useSetStyleWeekActiveMutation)(), 1), setStyleWeekActive = _b[0];
    var _c = __read((0, d4jApi_1.useDeclareWinnerMutation)(), 2), declareWinner = _c[0], winners = _c[1].data;
    var contestAction = (data === null || data === void 0 ? void 0 : data.contestActive) ? 'Deactivate' : 'Activate';
    var styleMonthAction = (data === null || data === void 0 ? void 0 : data.styleMonthActive) ? 'Deactivate' : 'Activate';
    if (!data) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return deleteAndy(); }, children: "Delete Andy" }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () {
                    return setStyleWeekActive({
                        contestActive: !data.contestActive,
                        styleMonthActive: data.styleMonthActive,
                    });
                }, children: [contestAction, " Contest"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () {
                    return setStyleWeekActive({
                        contestActive: data.contestActive,
                        styleMonthActive: !data.styleMonthActive,
                    });
                }, children: [styleMonthAction, " Style Month"] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return declareWinner(); }, children: "Declare Winner" }), winners &&
                winners.map(function (winner) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h3", { children: winner }) }, winner)); }), (0, jsx_runtime_1.jsx)(PrizeDrawing_1.default, {})] }));
};
exports.default = D4J;
