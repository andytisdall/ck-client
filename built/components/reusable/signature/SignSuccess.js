"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var authApi_1 = require("../../../state/apis/authApi");
var Loading_1 = __importDefault(require("../loading/Loading"));
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var SignSuccess = function (_a) {
    var returnLink = _a.returnLink;
    var _b = (0, react_router_dom_1.useParams)(), contactId = _b.contactId, hoursId = _b.hoursId;
    (0, driver_1.useGetDriverQuery)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            if (returnLink) {
                dispatch(authApi_1.optimisticallyUpdateHomeChefAgreement);
                dispatch(driver_1.optimisticallyUpdateDriverStatus);
            }
            else {
                navigate("../../confirm/".concat(contactId, "/").concat(hoursId));
            }
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Signing Completed" }), !returnLink && (0, jsx_runtime_1.jsx)(Loading_1.default, {}), !!returnLink && ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: returnLink, children: (0, jsx_runtime_1.jsx)("button", { children: "Continue" }) }))] }));
};
exports.default = SignSuccess;
