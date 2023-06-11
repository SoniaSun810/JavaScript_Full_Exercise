import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 0 update result view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();

    // 1 loading recipe, async function returns a promise
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2 rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }

  controlServings(model.state.recipe.servings);
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    
    // 1 get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2 load search results
    await model.loadSearchResults(query);
    // 3 render results
    console.log('get model.getSearchResults', model.getSearchResultsPage(3));
    resultView.render(model.getSearchResultsPage(1));

    // 4 render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2 render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();
