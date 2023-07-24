import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // Loading recipe
    await Model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(Model.state.recipe);
  } catch (err) {
    recipeView.renderErr();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    await Model.loadSearchResults(query);

    resultsView.render(Model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
