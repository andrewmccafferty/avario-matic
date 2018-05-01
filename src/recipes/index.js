import { getRandomArrayElement } from '../utils';
const requestPromise = require('request-promise');
const RECIPE_APP_ID = "12bb61a9";
const RECIPE_APP_KEY = "b9c7a9711f8b5bc41de2e08c59c47d26";
const getRecipeGetUrl = (searchTerm) => {
    return `https://api.edamam.com/search?q=${searchTerm}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`;
}

export const getRandomRecipe = (searchTerm) => {
    return requestPromise(getRecipeGetUrl(searchTerm)).then((res) => {
        const hits = JSON.parse(res).hits || [];
        return hits && hits.length ? getRandomArrayElement(hits).recipe : null;
    });
} 