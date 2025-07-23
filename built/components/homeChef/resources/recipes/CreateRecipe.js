"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var errorSlice_1 = require("../../../../state/apis/slices/errorSlice");
var recipeApi_1 = require("../../../../state/apis/volunteerApi/recipeApi");
require("./CreateRecipe.css");
var Loading_1 = __importDefault(require("../../../reusable/loading/Loading"));
var FileInput_1 = __importDefault(require("../../../reusable/file/FileInput"));
var CreateRecipe = function (_a) {
    var recipe = _a.recipe;
    var dispatch = (0, react_redux_1.useDispatch)();
    var mapSections = function (r) {
        return { header: r.header, text: r.text.join("\n") };
    };
    var _b = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.name) || ""), 2), name = _b[0], setName = _b[1];
    var _c = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.ingredients.map(mapSections)) || [{ header: "", text: "" }]), 2), ingredients = _c[0], setIngredients = _c[1];
    var _d = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.instructions.map(mapSections)) || [{ header: "", text: "" }]), 2), instructions = _d[0], setInstructions = _d[1];
    var _e = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.description) || ""), 2), description = _e[0], setDescription = _e[1];
    var _f = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.category) || ""), 2), category = _f[0], setCategory = _f[1];
    var _g = __read((0, react_1.useState)(), 2), photo = _g[0], setPhoto = _g[1];
    var _h = __read((0, react_1.useState)((recipe === null || recipe === void 0 ? void 0 : recipe.author) || ""), 2), author = _h[0], setAuthor = _h[1];
    var _j = __read((0, recipeApi_1.useEditRecipeMutation)(), 2), editRecipe = _j[0], editRecipeResult = _j[1];
    var _k = __read((0, recipeApi_1.useCreateRecipeMutation)(), 2), createRecipe = _k[0], createRecipeResult = _k[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (typeof photo === "string") {
            return;
        }
        if (!category) {
            return dispatch((0, errorSlice_1.setError)("Please choose a category"));
        }
        var formValues = {
            name: name,
            ingredients: JSON.stringify(ingredients),
            instructions: JSON.stringify(instructions),
            description: JSON.stringify(description),
            category: category,
            photo: photo,
            author: author,
        };
        if (recipe) {
            editRecipe(__assign({ id: recipe.id }, formValues));
        }
        else {
            createRecipe(formValues);
        }
    };
    var renderSections = function (fieldName) {
        var config = {
            instructions: {
                field: instructions,
                setField: setInstructions,
            },
            ingredients: {
                field: ingredients,
                setField: setIngredients,
            },
        };
        var label = fieldName[0].toUpperCase() + fieldName.slice(1);
        var _a = config[fieldName], field = _a.field, setField = _a.setField;
        var sections = field.map(function (item, i, list) {
            var text = field[i].text;
            return ((0, jsx_runtime_1.jsxs)("div", { className: "create-recipe-section", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "section-title", children: [list.length > 1 && "Section ", "Header (optional):"] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: item.header, onChange: function (e) {
                            setField(__spreadArray(__spreadArray(__spreadArray([], __read(field.slice(0, i)), false), [
                                { header: e.target.value, text: item.text }
                            ], false), __read(field.slice(i + 1)), false));
                        } }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "instructions", children: [list.length > 1 && "Section ", label, " (each on a new line, do not number):"] }), (0, jsx_runtime_1.jsx)("textarea", { required: true, value: text, id: "".concat(fieldName, "-text-").concat(i), onChange: function (e) {
                            return setField(__spreadArray(__spreadArray(__spreadArray([], __read(field.slice(0, i)), false), [
                                { header: item.header, text: e.target.value }
                            ], false), __read(field.slice(i + 1)), false));
                        } }), list.length > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "recipe-delete-section", onClick: function () {
                            return setField(__spreadArray(__spreadArray([], __read(field.slice(0, i)), false), __read(field.slice(i + 1)), false));
                        }, children: "x" }))] }, fieldName + i));
        });
        var addButton = ((0, jsx_runtime_1.jsxs)("div", { className: "recipe-add-section-info", children: [(0, jsx_runtime_1.jsx)("div", { className: "recipe-add-section", onClick: function () { return setField(__spreadArray(__spreadArray([], __read(field), false), [{ header: "", text: "" }], false)); }, children: "+" }), (0, jsx_runtime_1.jsx)("p", { children: "click to add a new section for a distinct component of the meal" })] }));
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { children: label }), sections, addButton] }));
    };
    var action = recipe ? "Edit this" : "Create a ";
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h2", { children: [action, " Recipe"] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "create-recipe", children: [(0, jsx_runtime_1.jsxs)("div", { className: "create-recipe-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Name:" }), (0, jsx_runtime_1.jsx)("input", { id: "name", type: "text", value: name, required: true, onChange: function (e) { return setName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "create-recipe-field", children: [(0, jsx_runtime_1.jsx)("label", { children: "Category:" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "category", id: "category-1", checked: category === "mains", onChange: function (e) {
                                            if (e.target.checked) {
                                                setCategory("mains");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "category-1", children: "Mains" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "category", id: "category-2", checked: category === "sides", onChange: function (e) {
                                            if (e.target.checked) {
                                                setCategory("sides");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "category-2", children: "Sides" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "category", id: "category-3", checked: category === "soups", onChange: function (e) {
                                            if (e.target.checked) {
                                                setCategory("soups");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "category-3", children: "Soups" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "category", id: "category-4", checked: category === "veggies", onChange: function (e) {
                                            if (e.target.checked) {
                                                setCategory("veggies");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "category-4", children: "Salads & Veggies" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "category", id: "category-5", checked: category === "desserts", onChange: function (e) {
                                            if (e.target.checked) {
                                                setCategory("desserts");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "category-5", children: "Desserts" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "create-recipe-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "author", children: "Recipe Author (optional):" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: author, onChange: function (e) { return setAuthor(e.target.value); }, id: "author" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "create-recipe-field", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "description", children: "Description (optional):" }), (0, jsx_runtime_1.jsx)("textarea", { value: description, id: "description", onChange: function (e) { return setDescription(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("div", { className: "create-recipe-field", children: renderSections("ingredients") }), (0, jsx_runtime_1.jsx)("div", { className: "create-recipe-field", children: renderSections("instructions") }), (0, jsx_runtime_1.jsx)("div", { className: "create-recipe-field", children: (0, jsx_runtime_1.jsx)(FileInput_1.default, { file: photo, setFile: setPhoto, label: "Photo (optional):" }) }), createRecipeResult.isLoading || editRecipeResult.isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" }))] })] }));
};
exports.default = CreateRecipe;
