"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_tz_1 = require("date-fns-tz");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var Calendar_1 = __importDefault(require("../../reusable/calendar/Calendar"));
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var HomeChefCalendar = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, homeChefApi_1.useGetShiftsQuery)(), data = _a.data, isLoading = _a.isLoading;
    var shifts = data === null || data === void 0 ? void 0 : data.shifts;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var orderedShifts = (0, react_1.useMemo)(function () {
        var orderedByDate = {};
        if (!shifts || !jobs) {
            return orderedByDate;
        }
        Object.values(shifts)
            .filter(function (sh) {
            var jobIndex = jobs.findIndex(function (j) { return j.id === sh.job; });
            var job = jobs[jobIndex];
            return (job === null || job === void 0 ? void 0 : job.ongoing) && job.active;
        })
            .forEach(function (sh) {
            var formattedTime = (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(sh.startTime, "America/Los_Angeles"), "yyyy-MM-dd");
            if (orderedByDate[formattedTime]) {
                orderedByDate[formattedTime].push(sh);
            }
            else {
                orderedByDate[formattedTime] = [sh];
            }
        });
        return orderedByDate;
    }, [shifts, jobs]);
    var getShifts = (0, react_1.useCallback)(function (d) {
        var dayShifts = [];
        if (orderedShifts[d] && jobs) {
            dayShifts = orderedShifts[d].map(function (sh) {
                var jobIndex = jobs.findIndex(function (j) { return j.id === sh.job; });
                var job = jobs[jobIndex];
                var available = sh.open;
                var status = available ? "" : "calendar-shift-disabled";
                var link = function () { return navigate("../shift/" + sh.id); };
                return ((0, jsx_runtime_1.jsx)("div", { className: "calendar-item calendar-color-".concat(jobIndex, " ").concat(status), onClick: function () { return available && link(); }, children: job.name }, sh.id));
            });
        }
        return dayShifts;
    }, [jobs, navigate, orderedShifts]);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    return (0, jsx_runtime_1.jsx)(Calendar_1.default, { renderItems: getShifts });
};
exports.default = HomeChefCalendar;
