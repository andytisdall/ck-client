import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import CreateRecipe from './CreateRecipe';
import Loading from '../../../reusable/Loading';
import { getRecipe, deleteRecipe } from '../../../../actions';
import './Recipe.css';

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

  const renderList = (list) => {
    return list.map((i) => {
      return <li key={i}>{i}</li>;
    });
  };

  const recipe = recipes[recipeId];
  const renderImage = () => {
    if (recipe.image) {
      return (
        <div className="recipe-photo">
          <img
            src={`https://coherent-vision-368820.uw.r.appspot.com/api/files/images/${recipe.image}`}
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
        {recipe.author ? <h3>Provided by: {recipe.author}</h3> : null}
        <div className="recipe-text">
          <h3 className="recipe-description">{recipe.description}</h3>
          <h2>Ingredients:</h2>
          <ul>{renderList(recipe.ingredients)}</ul>
          <h2>Instructions:</h2>
          <ol>{renderList(recipe.instructions)}</ol>
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

export default connect(mapStateToProps, { getRecipe, deleteRecipe })(Recipe);
