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
var react_redux_1 = require("react-redux");
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var driver_2 = require("../../../state/apis/volunteerApi/driver");
var CarSize_1 = __importDefault(require("./CarSize"));
var Car = function () {
    var _a, _b, _c, _d;
    var _e = __read((0, driver_2.useSubmitCarInfoMutation)(), 2), submitCarInfo = _e[0], isLoading = _e[1].isLoading;
    var driver = (0, driver_1.useGetDriverQuery)().data;
    var _f = __read((0, react_1.useState)(driver === null || driver === void 0 ? void 0 : driver.car.size), 2), size = _f[0], setSize = _f[1];
    var _g = __read((0, react_1.useState)(((_a = driver === null || driver === void 0 ? void 0 : driver.car) === null || _a === void 0 ? void 0 : _a.make) || ""), 2), make = _g[0], setMake = _g[1];
    var _h = __read((0, react_1.useState)(((_b = driver === null || driver === void 0 ? void 0 : driver.car) === null || _b === void 0 ? void 0 : _b.model) || ""), 2), model = _h[0], setModel = _h[1];
    var _j = __read((0, react_1.useState)(((_c = driver === null || driver === void 0 ? void 0 : driver.car) === null || _c === void 0 ? void 0 : _c.year) || ""), 2), year = _j[0], setYear = _j[1];
    var _k = __read((0, react_1.useState)(((_d = driver === null || driver === void 0 ? void 0 : driver.car) === null || _d === void 0 ? void 0 : _d.color) || ""), 2), color = _k[0], setColor = _k[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!size) return [3 /*break*/, 2];
                    return [4 /*yield*/, submitCarInfo({ size: size, make: make, model: model, year: year, color: color }).unwrap()];
                case 1:
                    _a.sent();
                    dispatch((0, alertSlice_1.setAlert)("Car info updated!"));
                    navigate("..");
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var renderSizes = function () {
        var sizes = ["Bike", "Small", "Medium", "Large"];
        return ((0, jsx_runtime_1.jsx)("div", { className: "driver-car-sizes", children: sizes.map(function (opt) {
                return ((0, jsx_runtime_1.jsx)(CarSize_1.default, { size: opt, setSize: setSize, selected: opt === size }, opt));
            }) }));
    };
    var renderCarInfo = function () {
        if (size && size !== "Bike") {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: (0, jsx_runtime_1.jsx)("u", { children: "Car Info" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding-car-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "make", children: "Make:" }), (0, jsx_runtime_1.jsx)("input", { id: "make", value: make, onChange: function (e) { return setMake(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding-car-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "model", children: "Model:" }), (0, jsx_runtime_1.jsx)("input", { id: "model", value: model, onChange: function (e) { return setModel(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding-car-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "year", children: "Year:" }), (0, jsx_runtime_1.jsx)("input", { id: "year", value: year, onChange: function (e) { return setYear(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding-car-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "color", children: "Color:" }), (0, jsx_runtime_1.jsx)("input", { value: color, id: "color", onChange: function (e) { return setColor(e.target.value); }, required: true })] })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Enter your vehicle's information" }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-text", children: (0, jsx_runtime_1.jsx)("p", { children: "Our cambros are insulated storage for transporting meals in bulk. They are 24\" tall, 16.5\" wide and 25.5\" deep." }) }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-car-images", children: [(0, jsx_runtime_1.jsxs)("div", { className: "driver-car-cambro-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label", children: "Small" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/drivers/sm-cambro.jpg", alt: "cambro" }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label driver-car-model", children: "Toyota Prius C" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-car-cambro-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label", children: "Medium" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/drivers/md-cambro-2.jpg", alt: "cambro" }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label driver-car-model", children: "Honda HR-V" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-car-cambro-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label", children: "Large" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/drivers/lg-cambro.jpg", alt: "cambro" }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-cambro-label driver-car-model", children: "Toyota Tacoma" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-text", children: (0, jsx_runtime_1.jsx)("p", { children: "Estimate your vehicle's size by how many cambros it can fit:" }) }), renderSizes(), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "driver-onboarding-car", children: [renderCarInfo(), (0, jsx_runtime_1.jsxs)("div", { children: [isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("input", { type: "submit", className: !size ? "btn-inactive" : "" })), (0, jsx_runtime_1.jsx)("button", { className: "cancel", onClick: function () { return navigate(".."); }, children: "Back" })] })] })] }));
};
exports.default = Car;
