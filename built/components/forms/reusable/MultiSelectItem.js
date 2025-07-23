"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var MultiSelectItem = function (_a) {
    var value = _a.value, addValue = _a.addValue, removeValue = _a.removeValue, id = _a.id;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: id, type: "checkbox", onChange: function (e) {
                        if (e.target.checked) {
                            addValue();
                        }
                        else {
                            removeValue();
                        }
                    } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: id, children: value })] }) }));
};
exports.default = MultiSelectItem;
