const express = require("express");
const router = express.Router();
const { productKeyModel } = require("../Models/productKeysModel");



// Create a new product key
router.post("/productKeys", async (req, res) => {
  try {
    const productKey = req.body;
    const createdProductKey = await productKeyModel.create(productKey);
    res.status(201).json(createdProductKey);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product key" });
  }
});



// Get all product keys
router.get("/productKeys", async (req, res) => {
  try {
    const productKeys = await productKeyModel.find();
    res.status(200).json(productKeys);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product keys" });
  }
});

router.get("/productKeys/total", async (req, res) => {
  try {
    const productKeys = await productKeyModel.find();
    const totalProducts = productKeys.length;
    res.status(200).json({ totalProducts });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product keys" });
  }
});

// Get a specific product key by ID
router.get("/productKeys/:id", async (req, res) => {
  try {
    const productKey = await productKeyModel.findById(req.params.id);
    if (!productKey) {
      return res.status(404).json({ error: "Product key not found" });
    }
    res.status(200).json(productKey);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product key" });
  }
});

// Get product details by product key
router.get("/productKeys/key/:productKey", async (req, res) => {
  try {
    const productKey = await productKeyModel.findOne({
      productKey: req.params.productKey
    });
    if (!productKey) {
      return res.status(404).json({ error: "Product key not found" });
    }
    res.status(200).json(productKey);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product details" });
  }
});

// Get products by dealer code
router.get("/productKeys/dealer/:dealerCode", async (req, res) => {
  try {
    const products = await productKeyModel.find({
      dealerCode: req.params.dealerCode
    });
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for the dealer code" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Update a specific product key by ID
router.patch("/productKeys/:id", async (req, res) => {
  try {
    const productKey = await productKeyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productKey) {
      return res.status(404).json({ error: "Product key not found" });
    }
    res.status(200).json(productKey);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product key" });
  }
});

// Update a specific product key by product key value
router.patch("/productKeys/key/:productKey", async (req, res) => {
    try {
      const productKey = await productKeyModel.findOneAndUpdate(
        { productKey: req.params.productKey },
        req.body,
        { new: true }
      );
      if (!productKey) {
        return res.status(404).json({ error: "Product key not found" });
      }
      res.status(200).json(productKey);
    } catch (err) {
      res.status(500).json({ error: "Failed to update product key" });
    }
  });

// Delete a specific product key by ID
router.delete("/productKeys/:id", async (req, res) => {
  try {
    const productKey = await productKeyModel.findByIdAndRemove(req.params.id);
    if (!productKey) {
      return res.status(404).json({ error: "Product key not found" });
    }
    res.status(200).json({ message: "Product key deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product key" });
  }
});

module.exports = router;
