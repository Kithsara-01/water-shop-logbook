import express from "express";
import {createProduct, getProducts, getProduct, updateProduct, deleteProduct, } from "../controllers/productController.js";

const productRoutes = express.Router();


// Create product
productRoutes.post("/products", createProduct);

// Get all products
productRoutes.get("/products", getProducts);

// Get single product
productRoutes.get("/products/:id", getProduct);

// Update product
productRoutes.put("/products/:id", updateProduct);

// Delete product
productRoutes.delete("/products/:id", deleteProduct);


export default productRoutes;