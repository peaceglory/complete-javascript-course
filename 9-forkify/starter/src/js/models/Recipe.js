import axios from 'axios';
import {test} from '../config';

export default class Recipe {

    constructor(id) {
        this.id = id;
        console.log(test);
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error);
            if (error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const shortByLongUnit = new Map()
            .set(/tablespoons*/, 'tbsp')
            .set(/ounces*/, 'oz')
            .set(/teaspoons*/, 'tsp')
            .set(/cups/, 'cup')
            .set(/pounds/, 'pound');

        const shortValuesArr = [ ...shortByLongUnit.values(), 'kg', 'g' ]; // or Array.from(shortByLongUnit.values())

        const newIngredients = this.ingredients.map(ing => {
            let ingredient = ing.toLowerCase();
            shortByLongUnit.forEach((short, long) => ingredient = ingredient.replace(long, short));

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(token => shortValuesArr.includes(token));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}