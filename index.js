const express = require("express");

const dotenv = require("dotenv");

//database connections

const DB = require("./data_connention");
// //data of user in import  by json type file
// const { users } = require("./data/users.json");

//import file from folder "Routes"
const users_router = require("./Routes/users");
const books_router = require("./Routes/books");

dotenv.config();

const app = express();

DB();
const port = 8080;

app.use(express.json());

//using files

app.use("/users", users_router);
app.use("/books", books_router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this route does not exist or develop",
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
