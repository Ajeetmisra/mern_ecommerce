const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.json({
          error: "Unable to find product in DB",
        });
      }
      req.product = product;
      next();
    });
};
exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.json({
        error: "problem with image",
      });
    }
    // restricions on fields

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.json({
        error: " please include all the fields",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.json({
          error: "file size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // save product into the database
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: `${err}`,
        });
      }
      return res.json(product);
    });
  });
};

exports.getAProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.json({
        err: "failed to delete the product",
      });
    }
    return res.json({
      message: "product deleted successfully",
      deletedProduct,
    });
  });
};

// update controller
exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.json({
        error: "problem with image",
      });
    }

    // updating the product
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.json({
          error: "file size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // save product into the database
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: `${err}`,
        });
      }
      return res.json(product);
    });
  });
};

// listing all the products

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; // query parameter always comes as a string in every language
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.json({
          err: "poblem in loading all the products",
        });
      }
      return res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    return res.json(categories);
  });
};

/* so the next plane is as soon as the user purchases 
 an item a middleware will fire that is responsible
 for uodating the stock and sold numbers
 yeah, we can acheive this by defining seperated methods 
 for both means (updateStock and updateSold) but here we are going 
 to explore one more method that is actually provided by mongoose 
 named bulkWrite. it actually works as a middleware and update the fields
 in bulk say more than one or two 
*/
exports.updateStock = (req, res, next) => {
  let MyOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(MyOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        err: "Bulk operation failed",
      });
    }
    next();
  });
};
