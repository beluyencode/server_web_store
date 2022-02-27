const express = require('express');
const router = express.Router();
const product = require("../controllers/productController");

router.get('/',product.getProduct);
router.get('/:id',product.getProductById);







module.exports = router;