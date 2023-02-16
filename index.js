require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const charactersRoute = require("./routes/characters");
const comicsRoute = require("./routes/comics");
const favoritesRoute = require("./routes/favoris");

app.use(charactersRoute);
app.use(comicsRoute);
app.use(favoritesRoute);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT, () => console.log("Server started"));
