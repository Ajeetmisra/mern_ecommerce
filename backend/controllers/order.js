const { Order, ProductCart } = require("../models/order");
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        res.status(400).json({
          error: "error in finding the order by id",
        });
      }
      req.order = order;
      next();
    });
};
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.Order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "error in saving order to DB",
      });
    }
    res.json(order);
  });
};
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Error in finding all the orders",
        });
      }
      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.order.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "error in updating the status",
        });
      }
      return res.json(order);
    }
  );
};
