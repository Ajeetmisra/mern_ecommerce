const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "not abe to save category in DB",
      });
    }
    res.status(200).json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.status(200).json(req.category);
};

exports.getCategories = () => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "not abe to find categories in DB",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "not abe to update category in DB",
      });
    }
    return res.json(category);
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    //
    if (err) {
      return res.status(400).json({
        error: "not abe to delete category in DB",
      });
    }
    return res.json({
      message: `${category} deleted`,
    });
  });
};
