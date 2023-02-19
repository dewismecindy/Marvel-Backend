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
    return res.status(200).json("Bienvenue sur notre serveur Marvel");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les personnages en GET
app.get("/characters", async (req, res) => {
  try {
    let filters = "";
    if (req.query.name) {
      filters = "&name=" + req.query.name;
    }
    let skip = "";
    if (req.query.skip) {
      skip = "&skip=" + req.query.skip * 100;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    /* return res.status(400).json({ error: error.message }); */
    console.log(error);
  }
});
app.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.APIKEY}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les comics en GET
app.get("/comics", async (req, res) => {
  try {
    // contacter l'API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.APIKEY}${filters}${skip}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    let filters = "";
    if (req.query.name) {
      filters = "&name=" + req.query.name;
    }
    let skip = "";
    if (req.query.skip) {
      skip = "&skip=" + req.query.skip * 100;
      console.log(skip);
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.APIKEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// + filtres

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur is on fire 🔥, on port ${PORT}`);
});
