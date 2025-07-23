"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var RadioFormItem = function (_a) {
    var value = _a.value, setValue = _a.setValue, name = _a.name, id = _a.id, language = _a.language;
    var label = value;
    if (language === 'English') {
        if (value === true) {
            label = 'Yes';
        }
        if (value === false) {
            label = 'No';
        }
    }
    if (language === 'Spanish') {
        if (value === true) {
            label = 'Sí';
        }
        if (value === false) {
            label = 'No';
        }
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("input", { id: id, name: name, type: "radio", onChange: function (e) {
                        if (e.target.checked) {
                            setValue();
                        }
                    } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: id, children: label })] }) }));
};
exports.default = RadioFormItem;
