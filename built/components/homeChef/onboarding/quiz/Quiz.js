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
var react_router_dom_1 = require("react-router-dom");
require("./Quiz.css");
var homeChefApi_1 = require("../../../../state/apis/volunteerApi/homeChefApi");
var QuizQuestion_1 = __importDefault(require("./QuizQuestion"));
var Loading_1 = __importDefault(require("../../../reusable/loading/Loading"));
var ANIMATION_DURATION = 200;
var Quiz = function () {
    var _a = __read((0, react_1.useState)(0), 2), page = _a[0], setPage = _a[1];
    var _b = __read((0, react_1.useState)({}), 2), userAnswers = _b[0], setUserAnswers = _b[1];
    var formRef = (0, react_1.useRef)(null);
    var questions = (0, homeChefApi_1.useGetQuizQuestionsQuery)().data;
    var _c = __read((0, homeChefApi_1.useSubmitQuizAnswersMutation)({
        fixedCacheKey: "home-chef-quiz",
    }), 2), submitQuizAnswers = _c[0], isLoading = _c[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) {
        e.preventDefault();
        var formattedAnswers = Object.keys(userAnswers).map(function (index) { return ({
            index: parseInt(index),
            answer: userAnswers[index],
        }); });
        submitQuizAnswers(formattedAnswers)
            .unwrap()
            .then(function () {
            navigate("../quiz-results");
        });
    };
    var transitionAnimation = (0, react_1.useCallback)(function (action) {
        var _a;
        var modifier = action === "add" ? 1 : -1;
        var width = window.outerWidth;
        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.animate([{}, { transform: "translateX(".concat(width * -modifier, "px)") }], ANIMATION_DURATION);
        setPage(function (page) {
            setTimeout(function () {
                var _a, _b;
                (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.animate([
                    { transform: "translateX(".concat(width * -modifier, "px)") },
                    { display: "none" },
                ], 10);
                (_b = formRef.current) === null || _b === void 0 ? void 0 : _b.animate([{ transform: "translateX(".concat(width * modifier, "px)") }, {}], ANIMATION_DURATION + 50);
            }, ANIMATION_DURATION);
            return page + modifier;
        });
    }, []);
    var nextPageBtn = (0, react_1.useMemo)(function () {
        var nextBtnDisabled = userAnswers[page] === undefined;
        var style = nextBtnDisabled ? "hc-quiz-btn-disabled" : "";
        var submitBtnDisabled = !Object.values(userAnswers).every(function (answer) { return answer !== undefined; }) ||
            Object.values(userAnswers).length !== (questions === null || questions === void 0 ? void 0 : questions.length);
        return questions && page < questions.length - 1 ? ((0, jsx_runtime_1.jsx)("button", { onClick: function (e) {
                e.preventDefault();
                transitionAnimation("add");
            }, disabled: nextBtnDisabled, className: style, children: "Next Question" })) : ((0, jsx_runtime_1.jsx)("button", { type: "submit", className: submitBtnDisabled ? "hc-quiz-btn-disabled" : "", children: "Submit Quiz" }));
    }, [page, questions, transitionAnimation, userAnswers]);
    var prevPageBtn = (0, react_1.useMemo)(function () {
        return (page !== 0 && ((0, jsx_runtime_1.jsx)("button", { onClick: function (e) {
                e.preventDefault();
                transitionAnimation("sub");
            }, children: "Previous Question" })));
    }, [page, transitionAnimation]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Home Chef Onboarding Quiz" }), (0, jsx_runtime_1.jsxs)("form", { className: "hc-quiz-form", ref: formRef, onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)(QuizQuestion_1.default, { page: page, userAnswers: userAnswers, setUserAnswers: setUserAnswers }), isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsxs)("div", { className: "hc-quiz-form-btns", children: [prevPageBtn, nextPageBtn] }))] })] }));
};
exports.default = Quiz;
