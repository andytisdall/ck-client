"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
require("./Volunteers.css");
var authApi_1 = require("../../state/apis/authApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var driver_1 = require("../../state/apis/volunteerApi/driver");
var config_1 = __importDefault(require("./config"));
var GetVolunteer_1 = __importDefault(require("./getVolunteer/GetVolunteer"));
var VolunteerSignInBase = function () {
    var campaignId = (0, react_router_dom_1.useParams)().campaignId;
    var _a = (0, authApi_1.useGetUserQuery)(), user = _a.data, userIsLoading = _a.isLoading;
    var _b = (0, driver_1.useGetDriverQuery)(), driver = _b.data, driverIsLoading = _b.isLoading;
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var navigate = (0, react_router_dom_1.useNavigate)();
    var driverCampaign = campaignId === config_1.default.deliveryDrivers.id;
    var invalidDriver = driverCampaign &&
        driver &&
        user &&
        (driver.driverStatus !== "Active" ||
            !driver.insuranceExpiration ||
            !driver.licenseExpiration ||
            new Date() > new Date(driver.insuranceExpiration) ||
            new Date() > new Date(driver.licenseExpiration));
    (0, react_1.useEffect)(function () {
        if (invalidDriver) {
            navigate("../driver-onboarding");
        }
    }, [invalidDriver, navigate]);
    if (userIsLoading || driverIsLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!driverCampaign) {
        if (!volunteer && !user) {
            return (0, jsx_runtime_1.jsx)(GetVolunteer_1.default, {});
        }
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
    }
    if (!user) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Please sign in to access this page." }), (0, jsx_runtime_1.jsxs)("p", { children: ["To get a username,", " ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "retro-link", to: "/forms/volunteer", children: "register as a volunteer here." })] })] }));
    }
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
};
exports.default = VolunteerSignInBase;
