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
var d4jApi_1 = require("../../../state/apis/d4jApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var PrizeDrawing = function () {
    var _a = __read((0, d4jApi_1.useDrawPrizeMutation)(), 2), drawPrize = _a[0], _b = _a[1], isLoading = _b.isLoading, data = _b.data;
    var checkIns = data === null || data === void 0 ? void 0 : data.numberOfCheckIns;
    var first = data === null || data === void 0 ? void 0 : data.firstPrize;
    var second = data === null || data === void 0 ? void 0 : data.secondPrize;
    var third = data === null || data === void 0 ? void 0 : data.thirdPrize;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Click the button below to randomly choose a winner from all valid D4J check-ins" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return drawPrize(); }, className: "d4j-btn", children: "Draw Winner" }), isLoading && (0, jsx_runtime_1.jsx)(Loading_1.default, {}), !!data && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("div", { children: "First Prize Winner: " }), (0, jsx_runtime_1.jsxs)("div", { className: "d4j-item", children: [first === null || first === void 0 ? void 0 : first.firstName, " ", first === null || first === void 0 ? void 0 : first.lastName] }), (0, jsx_runtime_1.jsx)("div", { children: "Second Prize Winner: " }), (0, jsx_runtime_1.jsxs)("div", { className: "d4j-item", children: [second === null || second === void 0 ? void 0 : second.firstName, " ", second === null || second === void 0 ? void 0 : second.lastName] }), (0, jsx_runtime_1.jsx)("div", { children: "Third Prize Winner: " }), (0, jsx_runtime_1.jsxs)("div", { className: "d4j-item", children: [third === null || third === void 0 ? void 0 : third.firstName, " ", third === null || third === void 0 ? void 0 : third.lastName] }), (0, jsx_runtime_1.jsxs)("div", { className: "d4j-item", children: [(0, jsx_runtime_1.jsx)("div", { children: "Total number of check ins in this batch:" }), (0, jsx_runtime_1.jsx)("div", { children: checkIns })] })] }) }))] }));
};
exports.default = PrizeDrawing;
