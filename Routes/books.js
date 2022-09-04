const { json } = require("express");
const express = require("express");
const router = express.Router();
// its also a way to import thinks but u can use other way too like:line:10
// const book_model = require("../models/book-modals");
// const user_model = require("../models/user-modals");

// like this

const { user_model, book_model } = require("../models");
// u dont have to metions models/index.js becoz index.js is defualt file u can if u want

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const {
  getallbooks,
  getsinglebookbyid,
  getallissuedbooks,
  createnewbook,
  updatebookbyid,
} = require("../controller/book-controller");

/**
 * Route:/books
 * Method: GET
 * description: get all Books
 * access: public
 * parameters: none
 */

router.get("/", getallbooks);

/**
 * Route:/books/:id
 * Method: GET
 * description: get all books by ids
 * access: public
 * parameters: ids
 */
router.get("/:id", getsinglebookbyid);

/**
 * Route:/books
 * Method: POST
 * description: create new book
 * access: public
 * parameters: none
 */

router.post("/", createnewbook);

/**
 * Route:/books/issued/by-user
 * Method: GET
 * description: Get info about issued books
 * access: public
 * parameters: none
 */
router.get("/issued/by-user", getallissuedbooks);

/**
 * Route:/books/:id
 * Method: PUT
 * description: Updating a book by a id
 * access: public
 * parameters: id
 */

router.put("/:id", updatebookbyid);

module.exports = router;
