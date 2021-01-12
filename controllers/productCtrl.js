const Products = require("../models/productModel");

//filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      (this.query = this.query).sort("createdAt");
    }
    return this;
  } 

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .sorting()
        .filtering()
        .paginating();

      const products = await features.query;

      res.json({
        status: "succes",
        result: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "no image upload" });
      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "this product already exists." });

      const newProdct = new Products({
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      });
      newProdct.save();

      res.json({ msg: "Create a product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Delete a product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        descrition,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "no image upload" });
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title,
          price,
          descrition,
          content,
          images,
          category,
        }
      );
      res.json({ msg: "Update a product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
