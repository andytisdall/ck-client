import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import CreateRecipe from './CreateRecipe';
import Loading from '../../../reusable/Loading';
import * as actions from '../../../../actions';
import { categories } from './RecipeList';
import './Recipe.css';

const IMAGE_URL = 'https://portal.ckoakland.org/api/files/images/';

const Recipe = ({ recipes, getRecipe, user, deleteRecipe, error }) => {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(!recipes[recipeId]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipes[recipeId]) {
      getRecipe(recipeId);
    } else {
      setLoading(false);
    }
  }, [recipes, recipeId, getRecipe]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const renderAdmin = () => {
    if (user.admin) {
      return (
        <div className="recipe-admin">
          <div className="recipe-edit" onClick={() => setEdit(!edit)}>
            edit this recipe
          </div>
          {edit && <CreateRecipe recipe={recipes[recipeId]} />}
          <div
            className="recipe-delete"
            onClick={() => {
              deleteRecipe(recipeId);
              navigate('..');
            }}
          >
            delete this recipe
          </div>
        </div>
      );
    }
  };

  const renderItems = (name) => {
    const listItems = ({ text }) =>
      text
        .filter((i) => i)
        .map((i) => {
          return <li key={i}>{i}</li>;
        });
    const config = {
      instructions: {
        items: recipe.instructions,
        listFunc: (item) => <ol>{listItems(item)}</ol>,
      },
      ingredients: {
        items: recipe.ingredients,
        listFunc: (item) => <ul>{listItems(item)}</ul>,
      },
    };
    const { items, listFunc } = config[name];
    return (
      <div>
        <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        {items.map((item) => {
          return (
            <div>
              {item.header ? <h4>{item.header}</h4> : null}
              {listFunc(item)}
            </div>
          );
        })}
      </div>
    );
  };

  const recipe = recipes[recipeId];
  const renderImage = () => {
    if (recipe.image) {
      return (
        <div className="recipe-photo">
          <img
            src={`${IMAGE_URL}${recipe.image}`}
            alt={recipe.name}
            className="recipe-img"
          />
        </div>
      );
    }
  };

  if (loading) {
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
          {recipe.author ? <h3>Provided by: {recipe.author}</h3> : null}
          <p>
            Category:{' '}
            {categories.find((cat) => cat.name === recipe.category).label}
          </p>
          <div className="recipe-description">{recipe.description}</div>
          {renderItems('ingredients')}
          {renderItems('instructions')}
        </div>
        {renderImage()}
      </div>
      {renderAdmin()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    user: state.user.user,
    error: state.error.error,
  };
};

export default connect(mapStateToProps, actions)(Recipe);
