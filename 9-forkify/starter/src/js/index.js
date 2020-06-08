import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, elementStrings, renderLoader, clearLoader } from "./views/base";
// import createRecipe from "./models/RecipeFunc";
import uniqid from 'uniqid';

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
            searchView.highlightSelected(id);
        }

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcServings();
            state.recipe.calcTime();

            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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

const controlList = () => {
    if (!state.list) {
        state.list = new List(uniqid);
    }
    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });
};

elements.shopping.addEventListener('click', event => {
   const id = event.target.closest('.shopping__item').dataset.itemid;

    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value);
        state.list.updateCount(id, val);
    }
});


const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

        // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

//TEST
window.st = state;