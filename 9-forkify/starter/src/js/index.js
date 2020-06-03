import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, elementStrings, renderLoader, clearLoader } from "./views/base";
// import createRecipe from "./models/RecipeFunc";

// global state of the app
const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResList);

        try {
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            clearLoader();
            alert(error);
        }
    }
};

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
    console.log(event.target);
    const btn = event.target.closest(`.${elementStrings.btnPrevNext}`); // EVENT DELEGATION
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) {
            recipeView.highlightSelected(id);
        }

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcServings();
            state.recipe.calcTime();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert(error);
        }
    }
};

// const controlRecipeFunc = () => {
//     const id = window.location.hash.replace('#', '');
//
//     state.recipe = createRecipe(id);
//
//     state.recipe.getRecipe()
//         .then(res => {
//             state.recipe.calcTime(res);
//             state.recipe.calcServings();
//             console.log(state.recipe);
//         })
//         .catch(error => alert(error));
// };

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});