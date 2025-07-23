"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var authApi_1 = require("../state/apis/authApi");
// import { useGetRestaurantQuery } from '../state/apis/mealProgramApi/restaurantApi';
var TextButton_1 = __importDefault(require("./reusable/TextButton"));
require("./Home.css");
var volunteersDescription = "Sign up to volunteer as a Home Chef, help out in the CK Kitchen, or donate your time at special events.";
// const mealProgramDescription =
// 'A portal for restaurants participating in our meal program to complete the tasks necessary to start providing meals.';
var textServiceDescription = "An interface for sending out text message alerts, adding phone numbers to the subscriber lists and reviewing feedback received from users.";
var userDescription = "An area for users to see their information and to change their password or username.";
var adminDescription = "An interface for CK staff to create users or restaurants for this site.";
var Home = function () {
    var userQuery = (0, authApi_1.useGetUserQuery)();
    var user = userQuery.data;
    var renderVolunteers = function () {
        return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "volunteers", buttonText: "CK Volunteers", descriptionText: volunteersDescription }));
    };
    // const renderMealProgram = () => {
    //   if (restaurant) {
    //     return (
    //       <TextButton
    //         to="meal-program"
    //         buttonText="Restaurant Meal Program"
    //         descriptionText={mealProgramDescription}
    //       />
    //     );
    //   }
    // };
    var renderTextService = function () {
        if ((user === null || user === void 0 ? void 0 : user.admin) || (user === null || user === void 0 ? void 0 : user.busDriver)) {
            return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "text", buttonText: "Text Service", descriptionText: textServiceDescription }));
        }
    };
    var renderAdmin = function () {
        if (user === null || user === void 0 ? void 0 : user.admin) {
            return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "admin", buttonText: "Admin", descriptionText: adminDescription }));
        }
    };
    var renderNoUser = function () {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderVolunteers() });
    };
    var renderWithUser = function () {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderTextService(), renderVolunteers(), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "user", buttonText: "User Settings", descriptionText: userDescription }), renderAdmin()] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "home main", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Home" }), user ? renderWithUser() : renderNoUser()] }));
};
exports.default = Home;
