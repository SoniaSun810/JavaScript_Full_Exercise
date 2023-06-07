import * as model from './model.js';
import recipeView from './views/RecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

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
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
