const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "USER NOT FOUND",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getuser = (req, res) => {
  req.profile.password = undefined;
  req.profile.session_token = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;

  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, user) => {
    if (err) {
      return res.json({
        error: "USERS NOT FOUND",
      });
    }

    return res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status.json({
          error: "you are not authorized to update the user",
        });
      }
      user.password = undefined;
      user.session_token = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      user.__v = undefined;
      res.json(user);
    }
  );
};
exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.status(200).json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let arrayOfPurachases = [];
  req.body.order.products.forEach((item) => {
    arrayOfPurachases.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // storing this info into database
  User.findOneAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { purchases: arrayOfPurachases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
