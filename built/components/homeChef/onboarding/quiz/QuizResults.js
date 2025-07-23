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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var homeChefApi_1 = require("../../../../state/apis/volunteerApi/homeChefApi");
var QuizResults = function () {
    var _a = __read((0, homeChefApi_1.useSubmitQuizAnswersMutation)({
        fixedCacheKey: "home-chef-quiz",
    }), 2), results = _a[1].data;
    var questions = (0, homeChefApi_1.useGetQuizQuestionsQuery)().data;
    var result = (results === null || results === void 0 ? void 0 : results.passed) ? "passed" : "did not pass";
    var renderWrongAnswers = function () {
        if (questions && (results === null || results === void 0 ? void 0 : results.wrongAnswers.length)) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "hc-quiz-wrong", children: [(0, jsx_runtime_1.jsx)("p", { children: "Questions answered incorrectly:" }), (0, jsx_runtime_1.jsx)("ul", { children: results.wrongAnswers.map(function (ans, i) {
                            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("li", { children: [questions[ans].question, results.passed && results.rightAnswers && ((0, jsx_runtime_1.jsxs)("div", { className: "hc-quiz-right", children: ["Correct Answer:", (0, jsx_runtime_1.jsx)("span", { className: "hc-quiz-right-answer", children: results.rightAnswers[i] })] }))] }) }, ans));
                        }) })] }));
        }
    };
    var renderRetakeLink = function () {
        if (!(results === null || results === void 0 ? void 0 : results.passed)) {
            return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../quiz", children: (0, jsx_runtime_1.jsx)("button", { children: "Retake Quiz" }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { children: "Continue Onboarding" }) }));
        }
    };
    if (!results) {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: "Quiz results could not be found." }) }));
    }
    var scoreColor = results.passed ? "hc-quiz-passed" : "hc-quiz-failed";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "hc-quiz-form", children: [(0, jsx_runtime_1.jsx)("h1", { className: "hc-quiz-question-header", children: "Home Chef Onboarding Quiz Results" }), (0, jsx_runtime_1.jsxs)("h2", { className: "hc-quiz-score ".concat(scoreColor), children: ["Score: ", results.score, "/", results.score + results.wrongAnswers.length] }), (0, jsx_runtime_1.jsxs)("p", { className: "hc-quiz-question", children: ["You ", result, " the quiz"] }), renderRetakeLink(), renderWrongAnswers()] }));
};
exports.default = QuizResults;
