import { connect } from 'react-redux';
import { useState } from 'react';

import { editRecipe } from '../../actions';

const EditRecipe = ({ editRecipe, recipes }) => {
  const [recipeId, setRecipeId] = useState('');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    editRecipe(recipeId, name, ingredients, instructions, description);
    setName('');
    setIngredients('');
    setInstructions('');
    setDescription('');
  };

  const renderRecipes = () => {
    return Object.values(recipes).map((r) => {
      return (
        <option key={r.id} value={r.id}>
          {r.name}
        </option>
      );
    });
  };

  const onRecipeSelect = (e) => {
    setRecipeId(e.target.value);
    const rec = recipes[e.target.value];
    if (rec) {
      setName(rec.name);
      setIngredients(rec.ingredients.join('\n'));
      setInstructions(rec.instructions);
      setDescription(rec.description);
    } else {
      setRecipeId('');
      setName('');
      setIngredients('');
      setInstructions('');
      setDescription('');
    }
  };

  return (
    <div className="admin-item">
      <h2>Edit a Recipe</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="recipeId">Recipe:</label>
        <select
          required
          value={recipeId}
          name="recipeId"
          onChange={onRecipeSelect}
        >
          <option value="">Select a Recipe</option>
          {renderRecipes()}
        </select>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="ingredients">
          Ingredients (separated by line breaks):
        </label>
        <textarea
          name="ingredients"
          value={ingredients}
          required
          onChange={(e) => setIngredients(e.target.value)}
        />
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          required
          value={instructions}
          name="instructions"
          onChange={(e) => setInstructions(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          required
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { recipes: state.recipes };
};

export default connect(mapStateToProps, { editRecipe })(EditRecipe);
