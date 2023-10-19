const express = require("express");
const app = express();
const cors = require("cors");
const { getPosts, addPosts } = require("./consultas");

app.use(express.json());
app.listen(3000, console.log("SERVIDOR ENCENDIDO"));
app.use(cors());

const morgan = require("morgan-body");

morgan(app);

app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await addPosts(titulo, url, descripcion);
  res.send("post created successfully");
});
