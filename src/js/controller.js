import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner(recipeContainer);

    // Loading recipe
    await Model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(Model.state.recipe);
  } catch (err) {
    recipeView.renderErr();
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};
init();
