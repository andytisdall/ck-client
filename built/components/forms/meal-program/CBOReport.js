"use strict";
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
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var ZipCodeSelector_1 = __importDefault(require("../../reusable/form/ZipCodeSelector"));
var formApi_1 = require("../../../state/apis/formApi");
var successMessage = 'Thank you for providing this information.';
var CBOReport = function () {
    var _a = __read((0, react_1.useState)(''), 2), month = _a[0], setMonth = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), name = _b[0], setName = _b[1];
    var _c = __read((0, react_1.useState)(''), 2), CBOName = _c[0], setCBOName = _c[1];
    var _d = __read((0, react_1.useState)(''), 2), email = _d[0], setEmail = _d[1];
    var _e = __read((0, react_1.useState)(''), 2), phone = _e[0], setPhone = _e[1];
    var _f = __read((0, react_1.useState)('2025'), 2), year = _f[0], setYear = _f[1];
    var _g = __read((0, react_1.useState)(''), 2), percentWOAccess = _g[0], setPercentWOAccess = _g[1];
    var _h = __read((0, react_1.useState)(''), 2), mealsProvided = _h[0], setMealsProvided = _h[1];
    var _j = __read((0, react_1.useState)(''), 2), unusable = _j[0], setUnusable = _j[1];
    var _k = __read((0, react_1.useState)(''), 2), postcards = _k[0], setPostcards = _k[1];
    var _l = __read((0, react_1.useState)(''), 2), calfreshApps = _l[0], setCalfreshApps = _l[1];
    var _m = __read((0, react_1.useState)(''), 2), SSA = _m[0], setSSA = _m[1];
    var _o = __read((0, react_1.useState)(''), 2), age17 = _o[0], setAge17 = _o[1];
    var _p = __read((0, react_1.useState)(''), 2), age26 = _p[0], setAge26 = _p[1];
    var _q = __read((0, react_1.useState)(''), 2), age49 = _q[0], setAge49 = _q[1];
    var _r = __read((0, react_1.useState)(''), 2), age60 = _r[0], setAge60 = _r[1];
    var _s = __read((0, react_1.useState)(''), 2), ageOver60 = _s[0], setAgeOver60 = _s[1];
    var _t = __read((0, react_1.useState)(''), 2), ageUnknown = _t[0], setAgeUnknown = _t[1];
    var _u = __read((0, react_1.useState)(''), 2), raceAfrican = _u[0], setRaceAfrican = _u[1];
    var _v = __read((0, react_1.useState)(''), 2), raceLatin = _v[0], setRaceLatin = _v[1];
    var _w = __read((0, react_1.useState)(''), 2), raceAsian = _w[0], setRaceAsian = _w[1];
    var _x = __read((0, react_1.useState)(''), 2), raceNativeAmerican = _x[0], setRaceNativeAmerican = _x[1];
    var _y = __read((0, react_1.useState)(''), 2), raceWhite = _y[0], setRaceWhite = _y[1];
    var _z = __read((0, react_1.useState)(''), 2), raceDecline = _z[0], setRaceDecline = _z[1];
    var _0 = __read((0, react_1.useState)(''), 2), raceUnknown = _0[0], setRaceUnknown = _0[1];
    var _1 = __read((0, react_1.useState)(''), 2), raceOther = _1[0], setRaceOther = _1[1];
    var _2 = __read((0, react_1.useState)(''), 2), raceOtherText = _2[0], setRaceOtherText = _2[1];
    var _3 = __read((0, react_1.useState)(''), 2), raceMixed = _3[0], setRaceMixed = _3[1];
    var _4 = __read((0, react_1.useState)(''), 2), raceMixedText = _4[0], setRaceMixedText = _4[1];
    var _5 = __read((0, react_1.useState)(''), 2), individuals = _5[0], setIndividuals = _5[1];
    var _6 = __read((0, react_1.useState)(''), 2), households = _6[0], setHouseholds = _6[1];
    var _7 = __read((0, react_1.useState)({}), 2), zips = _7[0], setZips = _7[1];
    var _8 = __read((0, react_1.useState)(0), 2), numberOfZips = _8[0], setNumberOfZips = _8[1];
    var _9 = __read((0, react_1.useState)(''), 2), feedback = _9[0], setFeedback = _9[1];
    var _10 = __read((0, react_1.useState)(''), 2), waters = _10[0], setWaters = _10[1];
    var _11 = __read((0, react_1.useState)(''), 2), juices = _11[0], setJuices = _11[1];
    var _12 = __read((0, react_1.useState)(''), 2), socks = _12[0], setSocks = _12[1];
    var _13 = __read((0, react_1.useState)(''), 2), granolaBars = _13[0], setGranolaBars = _13[1];
    var _14 = __read((0, react_1.useState)(''), 2), tortillaChips = _14[0], setTortillaChips = _14[1];
    var _15 = __read((0, react_1.useState)(''), 2), extraItem = _15[0], setExtraItem = _15[1];
    var _16 = __read((0, react_1.useState)(''), 2), extraItemAmount = _16[0], setExtraItemAmount = _16[1];
    var _17 = __read((0, react_1.useState)(false), 2), mobileOasisSectionOpen = _17[0], setMobileOasisSectionOpen = _17[1];
    var _18 = __read((0, formApi_1.useSubmitFormMutation)(), 2), submitForm = _18[0], isLoading = _18[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) {
        e.preventDefault();
        var age = { age17: age17, age26: age26, age49: age49, age60: age60, ageOver60: ageOver60, ageUnknown: ageUnknown };
        var race = {
            raceAfrican: raceAfrican,
            raceLatin: raceLatin,
            raceAsian: raceAsian,
            raceNativeAmerican: raceNativeAmerican,
            raceWhite: raceWhite,
            raceDecline: raceDecline,
            raceUnknown: raceUnknown,
            raceOther: raceOther,
            raceOtherText: raceOtherText,
            raceMixed: raceMixed,
            raceMixedText: raceMixedText,
        };
        var performanceMeasures = {
            percentWOAccess: percentWOAccess,
            mealsProvided: mealsProvided,
            unusable: unusable,
            postcards: postcards,
            calfreshApps: calfreshApps,
            SSA: SSA,
        };
        submitForm({
            formData: {
                month: month,
                name: name,
                CBOName: CBOName,
                performanceMeasures: performanceMeasures,
                age: age,
                race: race,
                individuals: individuals,
                households: households,
                zips: zips,
                feedback: feedback,
                phone: phone,
                email: email,
                year: year,
                waters: waters,
                juices: juices,
                socks: socks,
                granolaBars: granolaBars,
                tortillaChips: tortillaChips,
                extraItem: extraItem,
                extraItemAmount: extraItemAmount,
            },
            name: 'CBO_REPORT',
        })
            .unwrap()
            .then(function () {
            navigate('/forms/form-sent', { state: { message: successMessage } });
        });
    };
    var monthOptions = [
        { name: '', value: '' },
        { name: 'January', value: 0 },
        { name: 'February', value: 1 },
        { name: 'March', value: 2 },
        { name: 'April', value: 3 },
        { name: 'May', value: 4 },
        { name: 'June', value: 5 },
        { name: 'July', value: 6 },
        { name: 'August', value: 7 },
        { name: 'September', value: 8 },
        { name: 'October', value: 9 },
        { name: 'November', value: 10 },
        { name: 'December', value: 11 },
    ];
    var renderZipInputs = function () {
        var zipList = [];
        for (var i = 0; i < numberOfZips; i++) {
            zipList.push((0, jsx_runtime_1.jsx)(ZipCodeSelector_1.default, { zips: zips, setZips: setZips }, 'ziplist-' + i));
        }
        return zipList;
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("h1", { children: "CBO Monthly Report" }), (0, jsx_runtime_1.jsx)("p", { children: "Please fill out and submit this form by the 3rd of every month" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "cbo-name", children: "CBO Name" }), (0, jsx_runtime_1.jsx)("input", { id: "cbo-name", type: "text", value: CBOName, onChange: function (e) { return setCBOName(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "month", children: "Month" }), (0, jsx_runtime_1.jsx)("select", { id: "month", value: month, onChange: function (e) { return setMonth(e.target.value); }, required: true, children: monthOptions.map(function (mo) {
                            return ((0, jsx_runtime_1.jsx)("option", { value: mo.value, children: mo.name }, mo.value));
                        }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "year", children: "Year" }), (0, jsx_runtime_1.jsxs)("select", { id: "year", value: year, onChange: function (e) { return setYear(e.target.value); }, required: true, children: [(0, jsx_runtime_1.jsx)("option", { value: "2025", children: "2025" }), (0, jsx_runtime_1.jsx)("option", { value: "2024", children: "2024" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Report Completed By" }), (0, jsx_runtime_1.jsx)("input", { id: "name", type: "text", value: name, onChange: function (e) { return setName(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "phone", children: "Phone Number" }), (0, jsx_runtime_1.jsx)("input", { value: phone, onChange: function (e) { return setPhone(e.target.value); }, type: "tel", id: "phone" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", value: email, onChange: function (e) { return setEmail(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "meals", children: "# of CK Meals provided" }), (0, jsx_runtime_1.jsx)("input", { id: "meals", type: "number", min: 0, value: mealsProvided, onChange: function (e) { return setMealsProvided(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "unusable", children: "# of unusable meals" }), (0, jsx_runtime_1.jsx)("input", { id: "unusable", type: "number", min: 0, value: unusable, onChange: function (e) { return setUnusable(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "households", children: "# of unduplicated individuals provided food in the month" }), (0, jsx_runtime_1.jsx)("input", { id: "households", type: "number", min: 0, value: individuals, onChange: function (e) { return setIndividuals(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "households", children: "# of unduplicated households provided food in the month" }), (0, jsx_runtime_1.jsx)("input", { id: "households", type: "number", min: 0, value: households, onChange: function (e) { return setHouseholds(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "access", children: "Percent of people served who do not have access to a kitchen to prepare meals" }), (0, jsx_runtime_1.jsx)("input", { id: "access", type: "number", min: 0, max: 100, value: percentWOAccess, onChange: function (e) { return setPercentWOAccess(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "postcards", children: "# Cal Fresh postcards distributed with meals" }), (0, jsx_runtime_1.jsx)("input", { id: "postcards", type: "number", min: 0, value: postcards, onChange: function (e) { return setPostcards(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "calfresh", children: "# unduplicated individuals assisted with CalFresh applications" }), (0, jsx_runtime_1.jsx)("input", { id: "calfresh", type: "number", min: 0, value: calfreshApps, onChange: function (e) { return setCalfreshApps(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "postcards", children: "# prescreened CalFresh applications sent to SSA each month" }), (0, jsx_runtime_1.jsx)("input", { id: "postcards", type: "number", min: 0, value: SSA, onChange: function (e) { return setSSA(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "demo-title", children: "Age" }), (0, jsx_runtime_1.jsx)("div", { className: "form-instructions", children: "Enter the number of individuals from each age group." }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "age17", children: "0-17" }), (0, jsx_runtime_1.jsx)("input", { id: "age17", type: "number", min: 0, value: age17, onChange: function (e) { return setAge17(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "age26", children: "18-26" }), (0, jsx_runtime_1.jsx)("input", { id: "age26", type: "number", min: 0, value: age26, onChange: function (e) { return setAge26(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "age49", children: "27-49" }), (0, jsx_runtime_1.jsx)("input", { id: "age49", type: "number", min: 0, value: age49, onChange: function (e) { return setAge49(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "age60", children: "50-60" }), (0, jsx_runtime_1.jsx)("input", { id: "age60", type: "number", min: 0, value: age60, onChange: function (e) { return setAge60(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "ageOver60", children: "Over 60" }), (0, jsx_runtime_1.jsx)("input", { id: "ageOver60", type: "number", min: 0, value: ageOver60, onChange: function (e) { return setAgeOver60(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "ageUnknown", children: "Unknown" }), (0, jsx_runtime_1.jsx)("input", { id: "ageUnknown", type: "number", min: 0, value: ageUnknown, onChange: function (e) { return setAgeUnknown(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "demo-title", children: "Race" }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceAfrican", children: "African-American / Black" }), (0, jsx_runtime_1.jsx)("input", { id: "raceAfrican", type: "number", min: 0, value: raceAfrican, onChange: function (e) { return setRaceAfrican(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceLatin", children: "Latina / Latino" }), (0, jsx_runtime_1.jsx)("input", { id: "raceLatin", type: "number", min: 0, value: raceLatin, onChange: function (e) { return setRaceLatin(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceAsian", children: "Asian / Pacific Islander" }), (0, jsx_runtime_1.jsx)("input", { id: "raceAsian", type: "number", min: 0, value: raceAsian, onChange: function (e) { return setRaceAsian(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceNativeAmerican", children: "Native American / American Indian" }), (0, jsx_runtime_1.jsx)("input", { id: "raceNativeAmerican", type: "number", min: 0, value: raceNativeAmerican, onChange: function (e) { return setRaceNativeAmerican(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceWhite", children: "White / Caucasian" }), (0, jsx_runtime_1.jsx)("input", { id: "raceWhite", type: "number", min: 0, value: raceWhite, onChange: function (e) { return setRaceWhite(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceMixed", children: "Mixed Race" }), (0, jsx_runtime_1.jsx)("input", { id: "raceMixed", type: "number", min: 0, value: raceMixed, onChange: function (e) { return setRaceMixed(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("div", { className: "demo-item", children: (0, jsx_runtime_1.jsxs)("div", { className: "demo-sub-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceMixedText", children: "Specify Mixed Race" }), (0, jsx_runtime_1.jsx)("input", { id: "raceMixedText", type: "text", value: raceMixedText, onChange: function (e) { return setRaceMixedText(e.target.value); } })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceOther", children: "Other" }), (0, jsx_runtime_1.jsx)("input", { id: "raceOther", type: "number", min: 0, value: raceOther, onChange: function (e) { return setRaceOther(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("div", { className: "demo-item ", children: (0, jsx_runtime_1.jsxs)("div", { className: "demo-sub-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceOtherText", children: "Specify Other Race" }), (0, jsx_runtime_1.jsx)("input", { id: "raceOtherText", type: "text", value: raceOtherText, onChange: function (e) { return setRaceOtherText(e.target.value); } })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceDecline", children: "Decline to State" }), (0, jsx_runtime_1.jsx)("input", { id: "raceDecline", type: "number", min: 0, value: raceDecline, onChange: function (e) { return setRaceDecline(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "demo-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "raceUnknown", children: "Unknown" }), (0, jsx_runtime_1.jsx)("input", { id: "raceUnknown", type: "number", min: 0, value: raceUnknown, onChange: function (e) { return setRaceUnknown(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "demo-title", children: "Zip Code" }), (0, jsx_runtime_1.jsx)("div", { className: "form-instructions", children: "Select one or more zip codes and enter the number of people from that zip code." }), (0, jsx_runtime_1.jsxs)("div", { className: "form-zip-btns", children: [(0, jsx_runtime_1.jsx)("div", { className: "button", onClick: function () { return setNumberOfZips(function (z) { return z + 1; }); }, children: "Add a Zip Code" }), numberOfZips > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "button cancel", onClick: function () { return setNumberOfZips(function (z) { return z + -1; }); }, children: "Subtract a Zip Code" }))] }), (0, jsx_runtime_1.jsx)("div", { children: renderZipInputs() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "Do you have any feedback about the meals you\u2019ve been receiving?" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: feedback, onChange: function (e) { return setFeedback(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item form-mobile-oasis", children: [(0, jsx_runtime_1.jsx)("div", { onClick: function () { return setMobileOasisSectionOpen(!mobileOasisSectionOpen); }, children: (0, jsx_runtime_1.jsxs)("h2", { children: [mobileOasisSectionOpen ? ((0, jsx_runtime_1.jsx)("span", { className: "form-mobile-oasis-arrow", children: "\u2193" })) : ((0, jsx_runtime_1.jsx)("span", { className: "form-mobile-oasis-arrow", children: "\u2192" })), "CK Mobile Oasis drivers only"] }) }), mobileOasisSectionOpen && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "waters", children: "# of water bottles distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "waters", type: "number", min: 0, value: waters, onChange: function (e) { return setWaters(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "juices", children: "# of juice boxes distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "juices", type: "number", min: 0, value: juices, onChange: function (e) { return setJuices(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "socks", children: "Pairs of socks distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "socks", type: "number", min: 0, value: socks, onChange: function (e) { return setSocks(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "granola", children: "Granola bars distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "granola", type: "number", min: 0, value: granolaBars, onChange: function (e) { return setGranolaBars(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "chips", children: "Tortilla chip bags distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "chips", type: "number", min: 0, value: tortillaChips, onChange: function (e) { return setTortillaChips(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: "If you distributed an item not on this form, enter it here" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-checkbox", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "xtra", children: "Item Name" }), (0, jsx_runtime_1.jsx)("input", { id: "xtra", type: "text", value: extraItem, onChange: function (e) { return setExtraItem(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "xtraAmount", children: "# distributed" }), (0, jsx_runtime_1.jsx)("input", { id: "xtraAmount", type: "number", min: 0, value: extraItemAmount, onChange: function (e) { return setExtraItemAmount(e.target.value); } })] })] })] }))] }), !isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {})] }));
};
exports.default = CBOReport;
