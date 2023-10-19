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
};

module.exports = { getPosts, addPosts };
