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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var react_redux_1 = require("react-redux");
var doorfrontApi_1 = require("../../state/apis/mealProgramApi/doorfrontApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var alertSlice_1 = require("../../state/apis/slices/alertSlice");
var PastMeals_1 = __importDefault(require("./PastMeals"));
var Client_1 = __importDefault(require("./Client"));
var mealMax = 30;
var AddMeals = function () {
    var barcodeValue = (0, react_router_dom_1.useParams)().barcodeValue;
    var _a = __read((0, react_1.useState)(1), 2), meals = _a[0], setMeals = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), cCode = _b[0], setCcode = _b[1];
    var _c = __read((0, doorfrontApi_1.useAddMealsMutation)(), 2), addMeals = _c[0], addIsLoading = _c[1].isLoading;
    var _d = (0, doorfrontApi_1.useGetClientQuery)(barcodeValue || ""), data = _d.data, getIsLoading = _d.isLoading;
    var pastMeals = data === null || data === void 0 ? void 0 : data.clientMeals;
    var client = data === null || data === void 0 ? void 0 : data.client;
    var clientId = client === null || client === void 0 ? void 0 : client.id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var isLoading = addIsLoading || getIsLoading;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!barcodeValue || !pastMeals) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Something went wrong" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate(".."); }, children: "Back" })] }));
    }
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var numberOfMeals;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!clientId) return [3 /*break*/, 2];
                    numberOfMeals = cannotAddMeals ? 0 : meals;
                    return [4 /*yield*/, addMeals({ clientId: clientId, meals: numberOfMeals, cCode: cCode }).unwrap()];
                case 1:
                    _a.sent();
                    dispatch((0, alertSlice_1.setAlert)("Data Entered Sucessfully"));
                    navigate("..");
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var mealsThisMonth = pastMeals === null || pastMeals === void 0 ? void 0 : pastMeals.filter(function (meal) { return (0, date_fns_1.getMonth)(new Date(meal.date)) === (0, date_fns_1.getMonth)(new Date()); });
    var numberOfMealsThisMonth = mealsThisMonth.reduce(function (prev, cur) { return prev + cur.amount; }, 0);
    var cannotAddMeals = numberOfMealsThisMonth >= mealMax;
    var maxReachedForThisSesh = numberOfMealsThisMonth + meals >= mealMax;
    var renderAddMeals = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "doorfront-col", children: [(0, jsx_runtime_1.jsx)("b", { children: "Client is receiving" }), (0, jsx_runtime_1.jsx)("h3", { className: "doorfront-meal-count", children: "".concat(meals, " meal").concat(meals === 1 ? "" : "s") }), maxReachedForThisSesh && ((0, jsx_runtime_1.jsx)("div", { className: "doorfront-alert", children: "Cannot add more meals" })), (0, jsx_runtime_1.jsxs)("div", { className: "doorfront-btns", children: [(0, jsx_runtime_1.jsx)("button", { className: "doorfront-btn-sub doorfront-btn " +
                                (meals === 1 ? "btn-inactive" : ""), onClick: function () {
                                if (meals > 1) {
                                    setMeals(function (current) { return current - 1; });
                                }
                            }, children: "-" }), (0, jsx_runtime_1.jsx)("button", { className: "doorfront-btn-add doorfront-btn " +
                                (maxReachedForThisSesh ? "btn-inactive" : ""), onClick: function () {
                                if (!maxReachedForThisSesh) {
                                    setMeals(function (current) { return current + 1; });
                                }
                            }, children: "+" })] })] }));
    };
    var renderCannotAdd = function () {
        return ((0, jsx_runtime_1.jsx)("div", { className: "doorfront-col", children: "This client has reached their maximum amount of meals and may not add more for this period." }));
    };
    var renderControls = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "doorfront-submit-row", children: [(0, jsx_runtime_1.jsx)("button", { className: "cancel", onClick: function () { return navigate(".."); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { className: "doorfront-submit" + (meals > 0 ? "" : "btn-inactive"), onClick: onSubmit, children: "Submit" }), (0, jsx_runtime_1.jsx)("div", {})] }));
    };
    if (!clientId) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Error" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Client_1.default, { client: client, setCcode: setCcode }), (0, jsx_runtime_1.jsxs)("div", { className: "doorfront", children: [cannotAddMeals ? renderCannotAdd() : renderAddMeals(), (0, jsx_runtime_1.jsx)(PastMeals_1.default, { meals: pastMeals })] }), renderControls()] }));
};
exports.default = AddMeals;
