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
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var jobs_1 = require("../../../state/apis/volunteerApi/jobs");
var ShiftInfo_1 = __importDefault(require("../shiftInfo/ShiftInfo"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var Signup = function (_a) {
    var shiftId = _a.shiftId, campaign = _a.campaign, contactId = _a.contactId, afterSubmit = _a.afterSubmit;
    var _b = (0, jobs_1.useGetJobsQuery)({
        campaignId: campaign.id,
    }), jobs = _b.data, isLoading = _b.isLoading;
    var _c = __read((0, volunteerApi_1.useSignUpForVolunteerShiftMutation)(), 2), signUpForVolunteerShift = _c[0], submitLoading = _c[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var shifts = jobs === null || jobs === void 0 ? void 0 : jobs.map(function (j) { return j.shifts; }).flat();
    var shift = shiftId ? shifts === null || shifts === void 0 ? void 0 : shifts.find(function (sh) { return sh.id === shiftId; }) : undefined;
    var job = shift ? jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === shift.job; }) : undefined;
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var hour;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(shift && job)) return [3 /*break*/, 2];
                    return [4 /*yield*/, signUpForVolunteerShift({
                            shiftId: shift.id,
                            jobId: job.id,
                            date: shift.startTime,
                            contactSalesforceId: contactId,
                        }).unwrap()];
                case 1:
                    hour = _a.sent();
                    afterSubmit(hour.id);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var renderBtns = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signup-btns", children: [(0, jsx_runtime_1.jsx)("button", { onClick: onSubmit, children: "Confirm Signup" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate(".."); }, className: "cancel", children: "Back" })] }));
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!shift) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Could not find the requested info." });
    }
    if (!shift.open) {
        return (0, jsx_runtime_1.jsx)("p", { children: "This shift is not available for signup" });
    }
    if (!job || !campaign) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Could not find the info for this job." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "volunteers-signup-btns", children: "Confirm your signup:" }), (0, jsx_runtime_1.jsx)(ShiftInfo_1.default, { shift: shift, job: job, campaign: campaign }), submitLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : renderBtns()] }));
};
exports.default = Signup;
