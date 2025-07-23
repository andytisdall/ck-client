"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var formApi_1 = require("../../../state/apis/formApi");
var FormHeader_1 = __importDefault(require("./../reusable/FormHeader"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var RadioFormSet_1 = __importDefault(require("./../reusable/RadioFormSet"));
var MultiSelect_1 = __importDefault(require("./../reusable/MultiSelect"));
var LanguageSwitch_1 = __importDefault(require("./../reusable/LanguageSwitch"));
var mealSurveyQuestions_1 = require("./mealSurveyQuestions");
var NewMealSurvey = function () {
    var _a = __read((0, react_1.useState)(), 2), age = _a[0], setAge = _a[1];
    var _b = __read((0, react_1.useState)(), 2), ethnicity = _b[0], setEthnicity = _b[1];
    var _c = __read((0, react_1.useState)(), 2), zip = _c[0], setZip = _c[1];
    var _d = __read((0, react_1.useState)("English"), 2), language = _d[0], setLanguage = _d[1];
    var _e = __read((0, react_1.useState)(), 2), microwave = _e[0], setMicrowave = _e[1];
    var _f = __read((0, react_1.useState)(), 2), fridge = _f[0], setFridge = _f[1];
    var _g = __read((0, react_1.useState)(), 2), utensils = _g[0], setUtensils = _g[1];
    var _h = __read((0, react_1.useState)(), 2), numberOfPeople = _h[0], setNumberOfPeople = _h[1];
    var _j = __read((0, react_1.useState)(), 2), children = _j[0], setChildren = _j[1];
    var _k = __read((0, react_1.useState)(), 2), time = _k[0], setTime = _k[1];
    var _l = __read((0, react_1.useState)(), 2), mealType = _l[0], setMealType = _l[1];
    var _m = __read((0, react_1.useState)(), 2), mealType2 = _m[0], setMealType2 = _m[1];
    var _o = __read((0, react_1.useState)([]), 2), dietary = _o[0], setDietary = _o[1];
    var _p = __read((0, react_1.useState)(), 2), fruit = _p[0], setFruit = _p[1];
    var _q = __read((0, react_1.useState)(), 2), taste = _q[0], setTaste = _q[1];
    var _r = __read((0, react_1.useState)(), 2), access = _r[0], setAccess = _r[1];
    var _s = __read((0, react_1.useState)(), 2), skip = _s[0], setSkip = _s[1];
    var _t = __read((0, react_1.useState)(), 2), diabetes = _t[0], setDiabetes = _t[1];
    var _u = __read((0, react_1.useState)(), 2), hbp = _u[0], setHpb = _u[1];
    var _v = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _v[0], isLoading = _v[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var title = {
        English: "Meal Quality Survey",
        Spanish: "Encuesta de calidad de las comidas",
    };
    var headerText = {
        English: "Thank you for completing the Community Kitchens meal survey. Rest assured, your personal data will remain confidential. Your input is invaluable and plays a crucial role in securing funding to provide free meals to those in need.",
        Spanish: "Gracias por completar la encuesta sobre comidas de Community Kitchens. Tenga la seguridad de que sus datos personales se mantendrán confidenciales. Su aporte es invaluable y desempeña un papel crucial en la obtención de fondos para brindar comidas gratuitas a quienes las necesitan.",
    };
    (0, react_1.useEffect)(function () {
        window.scrollTo({ top: 0 });
    }, []);
    var onSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, submitForm({
                            formData: {
                                language: language,
                                age: age,
                                ethnicity: ethnicity,
                                zip: zip,
                                microwave: microwave,
                                fridge: fridge,
                                utensils: utensils,
                                numberOfPeople: numberOfPeople,
                                children: children,
                                time: time,
                                mealType: mealType,
                                mealType2: mealType2,
                                dietary: dietary,
                                fruit: fruit,
                                taste: taste,
                                access: access,
                                skip: skip,
                                diabetes: diabetes,
                                hbp: hbp,
                            },
                            name: "NEW_MEAL_SURVEY",
                        }).unwrap()];
                case 1:
                    _a.sent();
                    navigate("/forms/form-sent", {
                        state: {
                            message: "Thank you for filling out this survey! We will use your info to improve our free meal program.",
                            redirect: "/forms/meal-survey",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(FormHeader_1.default, { title: title[language], spanish: language === "Spanish", children: [headerText[language], (0, jsx_runtime_1.jsx)(LanguageSwitch_1.default, { language: language, setLanguage: setLanguage })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "age", setValue: setAge, question: mealSurveyQuestions_1.questions[0], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "ethnicity", setValue: setEthnicity, question: mealSurveyQuestions_1.questions[1], language: language }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "zip", children: mealSurveyQuestions_1.questions[14][language] }), (0, jsx_runtime_1.jsx)("input", { id: "zip", maxLength: 5, value: zip, type: "text", onChange: function (e) { return setZip(e.target.value); } })] }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "fridge", setValue: setFridge, question: mealSurveyQuestions_1.questions[15], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "microwave", setValue: setMicrowave, question: mealSurveyQuestions_1.questions[2], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "utensils", setValue: setUtensils, question: mealSurveyQuestions_1.questions[3], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "number-of-people", setValue: setNumberOfPeople, question: mealSurveyQuestions_1.questions[4], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "children", setValue: setChildren, question: mealSurveyQuestions_1.questions[5], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "time", question: mealSurveyQuestions_1.questions[6], language: language, setValue: setTime }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "mealType", language: language, question: mealSurveyQuestions_1.questions[7], setValue: setMealType }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "mealType2", language: language, question: mealSurveyQuestions_1.questions[8], setValue: setMealType2 }), (0, jsx_runtime_1.jsx)(MultiSelect_1.default, { label: mealSurveyQuestions_1.questions[9][language], question: mealSurveyQuestions_1.questions[9], setValue: setDietary, language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "fruit", setValue: setFruit, question: mealSurveyQuestions_1.questions[10], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "taste", setValue: setTaste, question: mealSurveyQuestions_1.questions[11], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "access", setValue: setAccess, question: mealSurveyQuestions_1.questions[12], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "skip", setValue: setSkip, question: mealSurveyQuestions_1.questions[13], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "diabetes", setValue: setDiabetes, question: mealSurveyQuestions_1.questions[16], language: language }), (0, jsx_runtime_1.jsx)(RadioFormSet_1.default, { name: "hbp", setValue: setHpb, question: mealSurveyQuestions_1.questions[17], language: language }), !isLoading ? ((0, jsx_runtime_1.jsx)("input", { type: "submit", value: language === "Spanish" ? "Enviar" : "Submit" })) : ((0, jsx_runtime_1.jsx)(Loading_1.default, {}))] })] }));
};
exports.default = NewMealSurvey;
