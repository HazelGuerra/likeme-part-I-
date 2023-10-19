const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "ha20030101",
  database: "likeme",
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const results = await pool.query("SELECT * FROM posts");
  return results.rows;
};

const addPosts = async (titulo, img, descripcion) => {
  const consulta =
    "INSERT INTO posts (id, titulo, img, descripcion, likes) values (DEFAULT, $1, $2, $3, 0)";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Post created");
  return result.rows;
};

const modifyPosts = async (id, titulo, img, descripcion, likes) => {
  const consulta =
    "UPDATE posts SET titulo = $2, img = $3, descripcion = $4, likes = $5 WHERE id = $1";
  const values = [id, titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post modified");
};

const likePost = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result.rows;
};

const deletePosts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 ";
  const values = [id];
  const result = await pool.query(consulta, values);
  console.log("Post deleted");
};

module.exports = { getPosts, addPosts, modifyPosts, deletePosts, likePost };
