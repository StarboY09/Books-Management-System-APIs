const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route:/user
 * Method: GET
 * description: get all users
 * access: public
 * parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route:/user/:id
 * Method: GET
 * description: get single user by id
 * access: public
 * parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route:/user
 * Method: POST
 * description: create new user
 * access: public
 * parameters: none
 */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(401).json({
      success: false,
      message: "User exists with this id",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    data: users,
  });
});

/**
 * Route:/users/:id
 * Method: put
 * description: updating user data
 * access: public
 * parameters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const updateduser = users.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: updateduser,
  });
});

/**
 * Route:/users/:id
 * Method: DELETE
 * description: deleting user data
 * access: public
 * parameters: id
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user in not present",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({ success: true, data: users });
});

/**
 * Route:/sub-detail/:id
 * Method: GET
 * description: Geting subscription detail by id
 * access: public
 * parameters: id
 *
 *
 * date formate will be mm/dd/yy
 */

router.get("/sub-detail/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  //get date in days
  const get_date = (data = "") => {
    let date;

    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }

    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const sub_type = (date) => {
    if (users.subscriptionDate === "Basic") {
      date += 90;
    } else if (users.subscriptionDate === "Standard") {
      date += 180;
    } else if (users.subscriptionDate === "Premium") {
      date += 365;
    }
    return date;
  };

  //subscription calucation
  //date start from january 1,1970 UTC.// millisecond

  let return_date = get_date(user.returnDate);
  let current_date = get_date();
  let sub_date = get_date(user.subscriptionDate);

  let sub_ex = sub_type(sub_date);

  const data = {
    ...user,
    subscription_Expired: sub_ex < current_date,
    Days_left: sub_ex <= current_date ? 0 : sub_ex - current_date,

    fine: return_date < current_date ? (sub_ex <= current_date ? 200 : 100) : 0,
  };

  res.status(200).json({ success: true, data: data });
});

module.exports = router;
