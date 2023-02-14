require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
// instanciation du serveur :
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  try {
    // console.log(process.env.MARVEL_API_KEY);
    return res.status(200).json("Bienvenue sur notre serveur Marvel 🍣");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les personnages en GET
app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query.name);
    let filters = "";
    if (req.query.name) {
      filters = filters + "&name=" + req.query.name;
    }
    // Filters peut avoir deux valeurs possibles : soit `""` (une string vide) soit `"&name=thor"` (un params query)

    // contacter l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" +
        process.env.MARVEL_API_KEY +
        filters
    );
    res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les comics liés à un personnage (GET)
app.get("/related-comics", async (req, res) => {
  try {
    console.log(req.query); // { characterID: '5fcf91f8d8a2480017b91459' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.query.characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les comics en GET
app.get("/comics", async (req, res) => {
  try {
    // contacter l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// + filtres

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur is on fire 🔥, on port ${PORT}`);
});
