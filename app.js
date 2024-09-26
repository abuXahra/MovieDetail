const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index", { movie: null, error: null });
});

app.post("/movie", async (req, res) => {
  const movieName = req.body.movieName;
  const apiKey = "b8f8ec5a"; // Replace with your own API key if needed

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`
    );

    const movie = response.data;

    if (movie.Response === "True") {
      res.render("index", { movie, error: null });
    } else {
      res.render("index", { movie: null, error: movie.Error });
    }
  } catch (error) {
    res.render("index", { movie: null, error: "Error fetching data." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
