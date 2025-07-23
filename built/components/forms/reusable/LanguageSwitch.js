"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var LanguageSwitch = function (_a) {
    var setLanguage = _a.setLanguage, language = _a.language;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-switch", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "language", id: "english", onChange: function (e) {
                    if (e.target.checked) {
                        setLanguage('English');
                    }
                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "english", className: language === 'English'
                    ? 'form-switch-selected-english'
                    : 'form-switch-label', children: "English" }), (0, jsx_runtime_1.jsx)("div", { className: "form-switch-toggle ".concat(language === 'Spanish' ? 'form-switch-toggled' : ''), onClick: function () {
                    if (language === 'English') {
                        setLanguage('Spanish');
                    }
                    else {
                        setLanguage('English');
                    }
                }, children: (0, jsx_runtime_1.jsx)("div", { className: "form-switch-button" }) }), (0, jsx_runtime_1.jsx)("input", { type: "radio", name: "language", id: "spanish", onChange: function (e) {
                    if (e.target.checked) {
                        setLanguage('Spanish');
                    }
                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "spanish", className: language === 'Spanish'
                    ? 'form-switch-selected-spanish'
                    : 'form-switch-label', children: "Espa\u00F1ol" })] }));
};
exports.default = LanguageSwitch;
