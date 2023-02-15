import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createRecipe, editRecipe } from '../../../../actions';
import './CreateRecipe.css';
import Loading from '../../../reusable/Loading';

const CreateRecipe = ({ createRecipe, alert, error, recipe }) => {
  const [name, setName] = useState(recipe?.name || '');
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients.join('\n') || ''
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions.join('\n') || ''
  );
  const [description, setDescription] = useState(recipe?.description || '');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (alert) {
      navigate('..');
    }
  }, [alert, navigate]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (recipe) {
      editRecipe(e.target);
    } else {
      createRecipe(e.target);
    }
    setName('');
    setIngredients('');
    setInstructions('');
    setDescription('');
  };

  const action = recipe ? 'Edit this' : 'Create a ';

  return (
    <div className="admin-item">
      <h2>{action} Recipe</h2>
      <form onSubmit={handleSubmit} className="admin-form">
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
        <label htmlFor="instructions">
          Instructions (separated by line breaks):
        </label>
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
        <label htmlFor="image">Photo</label>
        <input type="file" name="image" />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { createRecipe })(CreateRecipe);
