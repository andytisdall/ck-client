"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var CheckInSuccess = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var shiftId = (0, react_router_dom_1.useParams)().shiftId;
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            navigate('../list/' + shiftId);
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h3", { children: "You have successfully checked in!" }) }));
};
exports.default = CheckInSuccess;
