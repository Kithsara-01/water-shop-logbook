import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const {productId, name, category, description, price, discountPrice, stock, image } = req.body;

    // validation (simple check)
    if (!productId || !name || !category || !price) {
      return res.status(400).json({
        message: "Required fields missing ❌ (productId, name, category, price)",
      });
    }

    const product = new Product({
      productId,
      name,
      category,
      description,
      price,
      discountPrice,
      stock,
      image,
    });

    await product.save();

    res.status(201).json({
      message: "New product added successfully ✔️",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Product add failed ❌",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found ❌",
      });
    }

    res.status(200).json({
      message: "Products fetched successfully ✔️",
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products ❌",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found ❌",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product ❌",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found ❌",
      });
    }

    res.status(200).json({
      message: "Product updated successfully ✔️",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update product ❌",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found ❌",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully ✔️",
    });

  } catch (error) {
    res.status(500).json({
      message: "Product delete failed ❌",
      error: error.message,
    });
  }
};