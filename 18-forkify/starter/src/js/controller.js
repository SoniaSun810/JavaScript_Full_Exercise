import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookMarksView from './views/bookMarksView.js';
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
    bookMarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();

    // 1 loading recipe, async function returns a promise
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2 rendering recipe
    recipeView.render(recipe);

    // 3 update bookmarks view
    bookMarksView.update(model.state.bookmarks);
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

const controlAddBookmark = function () {
  // 1 add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  // 2 update recipe view
  recipeView.update(model.state.recipe);
  // 3 render bookmarks
  bookMarksView.render(model.state.bookmarks);
};

const constrolBookmarks = function () {
  bookMarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookMarksView.addHandlerRender(constrolBookmarks);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
}
// clearBookmarks();
