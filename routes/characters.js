const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.API_KEY
      }&name=${req.query.name || ""}&skip=${req.query.skip || 0}`
    );
    // console.log(response.data);

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
