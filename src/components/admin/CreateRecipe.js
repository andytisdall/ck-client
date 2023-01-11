import { connect } from 'react-redux';
import { useState } from 'react';

import { createRecipe } from '../../actions';
import './CreateRecipe.css';

const CreateRecipe = ({ createRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe(e.target);
    setName('');
    setIngredients('');
    setInstructions('');
    setDescription('');
  };

  return (
    <div className="admin-item">
      <h2>Create a Recipe</h2>
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default connect(null, { createRecipe })(CreateRecipe);
