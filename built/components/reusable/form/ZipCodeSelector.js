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
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipCodeOptions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
exports.zipCodeOptions = [
    '94501',
    '94502',
    '94536',
    '94537',
    '94538',
    '94539',
    '94540',
    '94541',
    '94542',
    '94543',
    '94544',
    '94545',
    '94546',
    '94550',
    '94551',
    '94552',
    '94555',
    '94557',
    '94560',
    '94566',
    '94568',
    '94577',
    '94578',
    '94579',
    '94580',
    '94586',
    '94587',
    '94588',
    '94601',
    '94602',
    '94603',
    '94604',
    '94605',
    '94606',
    '94607',
    '94608',
    '94609',
    '94610',
    '94611',
    '94612',
    '94613',
    '94614',
    '94615',
    '94616',
    '94617',
    '94618',
    '94619',
    '94620',
    '94621',
    '94623',
    '94624',
    '94661',
    '94662',
    '94701',
    '94702',
    '94703',
    '94704',
    '94705',
    '94706',
    '94707',
    '94708',
    '94709',
    '94710',
    '94712',
    'Decline to State',
    'Unhoused',
    'Other',
];
var ZipCodeSelector = function (_a) {
    var zips = _a.zips, setZips = _a.setZips;
    var _b = __read((0, react_1.useState)(''), 2), zipCode = _b[0], setZipCode = _b[1];
    var _c = __read((0, react_1.useState)('0'), 2), amount = _c[0], setAmount = _c[1];
    var setValues = function () {
        var _a;
        if (zipCode) {
            setZips(__assign(__assign({}, zips), (_a = {}, _a[zipCode] = amount, _a)));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("select", { value: zipCode, onChange: function (e) {
                    setZipCode(e.target.value);
                    setValues();
                }, children: [(0, jsx_runtime_1.jsx)("option", { value: undefined }), exports.zipCodeOptions.map(function (z) {
                        return ((0, jsx_runtime_1.jsx)("option", { disabled: Object.keys(zips).includes(z.replace(/ /g, '')), value: z.replace(/ /g, ''), children: z }, z));
                    })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", onChange: function (e) {
                    setAmount(e.target.value);
                    setValues();
                } })] }));
};
exports.default = ZipCodeSelector;
