const express = require("express");

const recipeRoutes = require("./routes/recipe.routes");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/recipes", recipeRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;