const express = require("express");
const app = express();
const cors = require("cors");
const {
  getPosts,
  addPosts,
  modifyPosts,
  deletePosts,
  likePost,
} = require("./consultas");

app.use(express.json());
app.listen(3000, console.log("SERVIDOR ENCENDIDO"));
app.use(cors());

const morgan = require("morgan-body");

morgan(app);

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const response = await addPosts(titulo, img, descripcion);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, img, descripcion, likes } = req.body;
    await modifyPosts(id, titulo, img, descripcion, likes);
    res.send("post modified successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await likePost(id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePosts(id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
