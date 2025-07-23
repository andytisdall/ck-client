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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var homeChefApi_1 = require("../../../../state/apis/volunteerApi/homeChefApi");
var Loading_1 = __importDefault(require("../../../reusable/loading/Loading"));
var QuizQuestion = function (_a) {
    var page = _a.page, userAnswers = _a.userAnswers, setUserAnswers = _a.setUserAnswers;
    var _b = (0, homeChefApi_1.useGetQuizQuestionsQuery)(), questions = _b.data, isLoading = _b.isLoading;
    var question = questions ? questions[page] : undefined;
    var q = question === null || question === void 0 ? void 0 : question.question;
    var answers = question === null || question === void 0 ? void 0 : question.answers.map(function (ans, i) {
        var selected = userAnswers[page] === i;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "hc-quiz-option", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", value: i, name: "question-" + page, id: "question-".concat(page, "-").concat(i), checked: selected, onChange: function (e) {
                        var _a;
                        return setUserAnswers(__assign(__assign({}, userAnswers), (_a = {}, _a[page] = parseInt(e.target.value), _a)));
                    } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "question-".concat(page, "-").concat(i), children: ans })] }, ans));
    });
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!q) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Error" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { className: "hc-quiz-question-header", children: ["Question ", page + 1] }), (0, jsx_runtime_1.jsx)("p", { className: "hc-quiz-question", children: q }), (0, jsx_runtime_1.jsx)("div", { children: answers })] }));
};
exports.default = QuizQuestion;
