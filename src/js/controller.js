import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(Model.getSearchResultsPage());
    bookmarkView.update(Model.state.bookmarks);

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

    resultsView.render(Model.getSearchResultsPage());

    paginationView.render(Model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = goToPage => {
  resultsView.render(Model.getSearchResultsPage(goToPage));

  paginationView.render(Model.state.search);
};

const controlServings = newServings => {
  Model.updateServings(newServings);

  // recipeView.render(Model.state.recipe);
  recipeView.update(Model.state.recipe);
};

const controlAddBookmark = () => {
  if (!Model.state.recipe.bookmarked) Model.addBookmark(Model.state.recipe);
  else Model.deleteBookmark(Model.state.recipe.id);

  recipeView.update(Model.state.recipe);

  bookmarkView.render(Model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarkView.render(Model.state.bookmarks);
};

const init = () => {
  bookmarkView.addHandlerBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
