import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import {
  useGetRecipesQuery,
  useDeleteRecipeMutation,
} from "../../../../state/apis/volunteerApi/recipeApi";
import { RecipeItem } from "../../../../state/apis/volunteerApi/types";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import CreateRecipe from "./CreateRecipe";
import Loading from "../../../reusable/loading/Loading";
import { categories } from "./RecipeList";
import "./Recipe.css";

const Recipe = () => {
  const { recipeId } = useParams();

  const recipes = useGetRecipesQuery().data;
  const recipe = recipes && recipeId ? recipes[recipeId] : undefined;

  const user = useGetUserQuery().data;

  const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();

  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const renderAdmin = () => {
    if (user?.admin && recipeId) {
      return (
        <div className="recipe-admin">
          <div className="recipe-edit" onClick={() => setEdit(!edit)}>
            edit this recipe
          </div>
          {edit && recipes && recipeId && (
            <CreateRecipe recipe={recipes[recipeId]} />
          )}
          <div
            className="recipe-delete"
            onClick={() => {
              deleteRecipe(recipeId);
              navigate("..");
            }}
          >
            delete this recipe
          </div>
        </div>
      );
    }
  };

  const renderItems = (name: "instructions" | "ingredients") => {
    const listItems = ({ text }: RecipeItem) =>
      text
        .filter((i?: string) => i)
        .map((i: string) => {
          return <li key={i}>{i}</li>;
        });
    const config = {
      instructions: {
        items: recipe?.instructions,
        listFunc: (item: RecipeItem) => (
          <ol className="recipe-section-items">{listItems(item)}</ol>
        ),
      },
      ingredients: {
        items: recipe?.ingredients,
        listFunc: (item: RecipeItem) => (
          <ul className="recipe-section-items">{listItems(item)}</ul>
        ),
      },
    };
    const { items, listFunc } = config[name];
    return (
      <div className="recipe-field">
        <h2 className="recipe-field-title">
          {name[0].toUpperCase() + name.slice(1)}
        </h2>
        {items?.map((item, i) => {
          return (
            <div className="recipe-section" key={name + i}>
              {item.header ? <h4>{item.header}</h4> : null}
              {listFunc(item)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderImage = () => {
    if (recipe?.image) {
      return (
        <div className="recipe-photo">
          <img src={recipe.image} alt={recipe.name} className="recipe-img" />
        </div>
      );
    }
  };

  const renderDescription = () => {
    if (Array.isArray(recipe?.description)) {
      return recipe?.description.map((d) => <p key={d}>{d}</p>);
    }
    return recipe?.description;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe">
      <Link to="..">
        <button>All Recipes</button>
      </Link>
      <h1 className="recipe-title">{recipe.name}</h1>
      <div className="recipe-body">
        <div className="recipe-text">
          <div className="recipe-info">
            {recipe.author ? (
              <p>
                <span className="recipe-bold">Author:</span> {recipe.author}
              </p>
            ) : null}
            <p>
              <span className="recipe-bold">Category:</span>
              {categories.find((cat) => cat.name === recipe.category)?.label}
            </p>
            <div className="recipe-description">{renderDescription()}</div>
          </div>
          {renderItems("ingredients")}
          {renderItems("instructions")}
        </div>
        {renderImage()}
      </div>
      {renderAdmin()}
    </div>
  );
};

export default Recipe;
