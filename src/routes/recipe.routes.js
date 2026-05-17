const express = require("express");

const recipeController = require("../controllers/recipe.controller");

const router = express.Router();

router.get("/", recipeController.getRecipes);

router.post("/", recipeController.createRecipe);

router.patch("/:id", recipeController.updateRecipe);

router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;