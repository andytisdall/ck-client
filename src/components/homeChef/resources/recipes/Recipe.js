import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import CreateRecipe from './CreateRecipe';
import Loading from '../../../reusable/loading/Loading';
import * as actions from '../../../../actions';
import { categories } from './RecipeList';
import './Recipe.css';
import useLoading from '../../../../hooks/useLoading';

const Recipe = ({ recipes, getRecipe, user, deleteRecipe }) => {
  const { recipeId } = useParams();
  const recipe = recipes[recipeId];

  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (!recipe) {
      setLoading(true);
      getRecipe(recipeId);
    } else {
      setLoading(false);
    }
  }, [recipe, recipeId, getRecipe, setLoading]);

  useEffect(() => {
    setEdit(false);
  }, [recipe]);

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
        listFunc: (item) => (
          <ol className="recipe-section-items">{listItems(item)}</ol>
        ),
      },
      ingredients: {
        items: recipe.ingredients,
        listFunc: (item) => (
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
        {items.map((item, i) => {
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
    if (recipe.image) {
      return (
        <div className="recipe-photo">
          <img src={recipe.image} alt={recipe.name} className="recipe-img" />
        </div>
      );
    }
  };

  const renderDescription = () => {
    if (Array.isArray(recipe.description)) {
      return recipe.description.map((d) => <p key={d}>{d}</p>);
    }
    return recipe.description;
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
          <div className="recipe-info">
            {recipe.author ? (
              <p>
                <span className="recipe-bold">Author:</span> {recipe.author}
              </p>
            ) : null}
            <p>
              <span className="recipe-bold">Category:</span>
              {categories.find((cat) => cat.name === recipe.category).label}
            </p>
            <div className="recipe-description">{renderDescription()}</div>
          </div>
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
  };
};

export default connect(mapStateToProps, actions)(Recipe);
