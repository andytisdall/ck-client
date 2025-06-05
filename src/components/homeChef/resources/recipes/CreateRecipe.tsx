import { useState, FormEventHandler } from "react";
import { useDispatch } from "react-redux";

import { setError } from "../../../../state/apis/slices/errorSlice";
import {
  useEditRecipeMutation,
  useCreateRecipeMutation,
} from "../../../../state/apis/volunteerApi/recipeApi";
import { Recipe, RecipeItem } from "../../../../state/apis/volunteerApi/types";
import "./CreateRecipe.css";
import Loading from "../../../reusable/loading/Loading";
import FileInput from "../../../reusable/file/FileInput";

const CreateRecipe = ({ recipe }: { recipe?: Recipe }) => {
  const dispatch = useDispatch();

  const mapSections = (r: RecipeItem) => {
    return { header: r.header, text: r.text.join("\n") };
  };

  const [name, setName] = useState(recipe?.name || "");
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients.map(mapSections) || [{ header: "", text: "" }]
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions.map(mapSections) || [{ header: "", text: "" }]
  );
  const [description, setDescription] = useState(recipe?.description || "");
  const [category, setCategory] = useState(recipe?.category || "");
  const [photo, setPhoto] = useState<File>();
  const [author, setAuthor] = useState(recipe?.author || "");

  const [editRecipe, editRecipeResult] = useEditRecipeMutation();
  const [createRecipe, createRecipeResult] = useCreateRecipeMutation();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (typeof photo === "string") {
      return;
    }
    if (!category) {
      return dispatch(setError("Please choose a category"));
    }
    const formValues = {
      name,
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
      description: JSON.stringify(description),
      category,
      photo,
      author,
    };
    if (recipe) {
      editRecipe({ id: recipe.id, ...formValues });
    } else {
      createRecipe(formValues);
    }
  };

  const renderSections = (fieldName: "instructions" | "ingredients") => {
    const config = {
      instructions: {
        field: instructions,
        setField: setInstructions,
      },
      ingredients: {
        field: ingredients,
        setField: setIngredients,
      },
    };
    const label = fieldName[0].toUpperCase() + fieldName.slice(1);
    const { field, setField } = config[fieldName];
    const sections = field.map((item, i, list) => {
      const { text } = field[i];
      return (
        <div className="create-recipe-section" key={fieldName + i}>
          <label htmlFor="section-title">
            {list.length > 1 && "Section "}Header (optional):
          </label>
          <input
            type="text"
            value={item.header}
            onChange={(e) => {
              setField([
                ...field.slice(0, i),
                { header: e.target.value, text: item.text },
                ...field.slice(i + 1),
              ]);
            }}
          />
          <label htmlFor="instructions">
            {list.length > 1 && "Section "}
            {label} (each on a new line, do not number):
          </label>
          <textarea
            required
            value={text}
            id={`${fieldName}-text-${i}`}
            onChange={(e) =>
              setField([
                ...field.slice(0, i),
                { header: item.header, text: e.target.value },
                ...field.slice(i + 1),
              ])
            }
          />
          {list.length > 1 && (
            <div
              className="recipe-delete-section"
              onClick={() =>
                setField([...field.slice(0, i), ...field.slice(i + 1)])
              }
            >
              x
            </div>
          )}
        </div>
      );
    });
    const addButton = (
      <div className="recipe-add-section-info">
        <div
          className="recipe-add-section"
          onClick={() => setField([...field, { header: "", text: "" }])}
        >
          +
        </div>
        <p>click to add a new section for a distinct component of the meal</p>
      </div>
    );
    return (
      <>
        <label>{label}</label>
        {sections}
        {addButton}
      </>
    );
  };

  const action = recipe ? "Edit this" : "Create a ";

  return (
    <div>
      <h2>{action} Recipe</h2>
      <form onSubmit={handleSubmit} className="create-recipe">
        <div className="create-recipe-field">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="create-recipe-field">
          <label>Category:</label>
          <div>
            <input
              type="radio"
              name="category"
              id="category-1"
              checked={category === "mains"}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory("mains");
                }
              }}
            />
            <label htmlFor="category-1">Mains</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              id="category-2"
              checked={category === "sides"}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory("sides");
                }
              }}
            />
            <label htmlFor="category-2">Sides</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              id="category-3"
              checked={category === "soups"}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory("soups");
                }
              }}
            />
            <label htmlFor="category-3">Soups</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              id="category-4"
              checked={category === "veggies"}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory("veggies");
                }
              }}
            />
            <label htmlFor="category-4">Salads & Veggies</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              id="category-5"
              checked={category === "desserts"}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory("desserts");
                }
              }}
            />
            <label htmlFor="category-5">Desserts</label>
          </div>
        </div>

        <div className="create-recipe-field">
          <label htmlFor="author">Recipe Author (optional):</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
          />
        </div>

        <div className="create-recipe-field">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            value={description}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="create-recipe-field">
          {renderSections("ingredients")}
        </div>

        <div className="create-recipe-field">
          {renderSections("instructions")}
        </div>

        <div className="create-recipe-field">
          <FileInput
            file={photo}
            setFile={setPhoto}
            label="Photo (optional):"
          />
        </div>
        {createRecipeResult.isLoading || editRecipeResult.isLoading ? (
          <Loading />
        ) : (
          <input type="submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

export default CreateRecipe;
