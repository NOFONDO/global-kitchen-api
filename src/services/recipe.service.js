const Recipe = require("../models/recipe.model");
const ApiError = require("../utils/ApiError");

const getAllRecipes = async (category) => {
  const filter = {};

  if (category) {
    filter.category = {
      $regex: new RegExp(category, "i"),
    };
  }

  const recipes = await Recipe.find(filter).sort({
    createdAt: -1,
  });

  return recipes;
};

const createRecipe = async (recipeData) => {
  if (
    recipeData.cookingTime &&
    recipeData.cookingTime <= 0
  ) {
    throw new ApiError(
      400,
      "Cooking time must be greater than 0"
    );
  }

  const recipe = await Recipe.create(recipeData);

  return recipe;
};

const updateRecipe = async (recipeId, updateData) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  if (
    updateData.cookingTime &&
    updateData.cookingTime <= 0
  ) {
    throw new ApiError(
      400,
      "Cooking time must be greater than 0"
    );
  }

  Object.assign(recipe, updateData);

  await recipe.save();

  return recipe;
};

const deleteRecipe = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  await recipe.deleteOne();
};

module.exports = {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};