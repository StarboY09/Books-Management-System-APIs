const { user_model, book_model } = require("../models");
const IssuedBook = require("../dtos/book-dto");

exports.getallbooks = async (req, res) => {
  const books = await book_model.find();

  if (books.length === 0)
    return res.status(404).json({ succes: false, message: "books not found" });
  res.status(200).json({ succes: true, data: books });
};

exports.getsinglebookbyid = async (req, res) => {
  const { id } = req.params;
  const book = await book_model.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "books not found by id",
    });
  }

  return res.status(200).json({ success: true, data: book });
};

exports.getallissuedbooks = async (req, res) => {
  const users = await user_model
    .find({
      issuedBook: { $exists: true }, // u can also this way like a spec this like categore:"plant" so it will find or give things having categore of plant
    })
    .populate("issuedBook");

  const issued_book_by_user = users.map((each) => new IssuedBook(each));

  if (issued_book_by_user.length === 0)
    return res.status(404).json({ success: false, message: "No issued books" });

  return res.status(200).json({ success: true, data: issued_book_by_user });
};
// one way of doing it
// module.exports={getallbooks,getsinglebookbyid}
exports.createnewbook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }

  await book_model.create(data);

  const allBooks = await book_model.find();

  return res.status(201).json({
    success: true,
    data: allBooks,
  });
};

exports.updatebookbyid = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatebook = await book_model.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );

  return res.status(200).json({ success: true, data: updatebook });
};
