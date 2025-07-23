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
var emailAddressIsValid_1 = __importDefault(require("../../utils/emailAddressIsValid"));
var volunteerApi_1 = require("../../state/apis/volunteerApi/volunteerApi");
var checkInApi_1 = require("../../state/apis/volunteerApi/checkInApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var errorSlice_1 = require("../../state/apis/slices/errorSlice");
var signApi_1 = require("../../state/apis/signApi");
var CreateVolunteer = function () {
    var _a = __read((0, react_1.useState)(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), firstName = _b[0], setFirstName = _b[1];
    var _c = __read((0, react_1.useState)(""), 2), lastName = _c[0], setLastName = _c[1];
    var shiftId = (0, react_router_dom_1.useParams)().shiftId;
    var _d = __read((0, volunteerApi_1.useCreateVolunteerMutation)(), 2), createVolunteer = _d[0], addVolIsLoading = _d[1].isLoading;
    var _e = __read((0, checkInApi_1.useCreateVolunteerHoursMutation)(), 2), createVolunteerHours = _e[0], hoursIsLoading = _e[1].isLoading;
    var _f = __read((0, volunteerApi_1.useLazyGetVolunteerQuery)(), 2), getVolunteer = _f[0], getVolIsLoading = _f[1].isLoading;
    var signApiConfig = (0, signApi_1.useGetSigningConfigQuery)(undefined, {
        pollingInterval: 60000,
    }).data;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var isLoading = addVolIsLoading || hoursIsLoading || getVolIsLoading;
    var onSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var volunteer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!(0, emailAddressIsValid_1.default)(email)) {
                        return [2 /*return*/, dispatch((0, errorSlice_1.setError)("Email address is invalid"))];
                    }
                    if (!shiftId) {
                        return [2 /*return*/, dispatch((0, errorSlice_1.setError)("No shift ID in the URL. Please start over."))];
                    }
                    return [4 /*yield*/, getVolunteer(email).unwrap()];
                case 1:
                    volunteer = _a.sent();
                    if (!!volunteer) return [3 /*break*/, 3];
                    return [4 /*yield*/, createVolunteer({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                        }).unwrap()];
                case 2:
                    volunteer = _a.sent();
                    _a.label = 3;
                case 3: 
                // create hours
                return [4 /*yield*/, createVolunteerHours({
                        shiftId: shiftId,
                        contactId: volunteer.id,
                    }).unwrap()];
                case 4:
                    // create hours
                    _a.sent();
                    if (signApiConfig === null || signApiConfig === void 0 ? void 0 : signApiConfig.limitReached) {
                        navigate("../confirm/".concat(volunteer.id, "/").concat(shiftId));
                    }
                    else {
                        navigate("../sign/pre/" + volunteer.id + "/" + shiftId);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "check-in-new-volunteer-form", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "first-name", children: "First Name" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "first-name", type: "text", value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "last-name", children: "Last Name" }), (0, jsx_runtime_1.jsx)("input", { id: "last-name", required: true, type: "text", value: lastName, onChange: function (e) { return setLastName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { id: "email", type: "text", value: email, onChange: function (e) { return setEmail(e.target.value); } })] }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }), (0, jsx_runtime_1.jsx)("button", { className: "cancel", onClick: function () { return navigate(-1); }, children: "Back" })] }));
};
exports.default = CreateVolunteer;
