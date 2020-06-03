import axios from 'axios';

export default function createRecipe(id) {
    let title, author, img, url, ingredients, time, servings;

    return {
        getRecipe: () => {
            return new Promise(resolve => {
                axios(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
                    .then(res => resolve(res))
                    .catch(error => {
                        alert(error);
                        if (error.response.data.error) {
                            alert(error.response.data.error);
                        }
                    });
            });

        },
        calcTime: (res) => {
            const numIng = res.data.recipe.ingredients.length;
            const periods = Math.ceil(numIng / 3);
            time = periods * 15;
            return time;
        },
        calcServings: () => {
            servings = 4;
        },
        parseIngredients: () => {
            const shortByLongUnit = new Map();
            shortByLongUnit.set('tablespoon', 'tbsp');
            shortByLongUnit.set('tablespoons', 'tbsp');
            shortByLongUnit.set('ounce', 'oz');
            shortByLongUnit.set('ounces', 'oz');
            shortByLongUnit.set('teaspoon', 'tsp');
            shortByLongUnit.set('teaspoons', 'tsp');
            shortByLongUnit.set('cups', 'cup');
            shortByLongUnit.set('pounds', 'pound');

            const newIngredients = ingredients.map(ing => {
                let ingredient = ing.toLowerCase();
            });
            ingredients = newIngredients;
        }
    }
};