import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getRecipes } from '../../../../actions';

const RecipeList = ({ recipes, getRecipes }) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const renderRecipes = () => {
    return Object.values(recipes).map((r) => {
      return (
        <li key={r.id}>
          <Link to={r.id}>{r.name}</Link>
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Recipes</h1>
      <Link to="add-recipe">
        <button>Add a Recipe</button>
      </Link>
      <ul>{renderRecipes()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { recipes: state.recipes };
};

export default connect(mapStateToProps, { getRecipes })(RecipeList);
