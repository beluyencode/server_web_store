const db = require("../db");

class Product {
    getProductById(req, res) {
        let arr = db.product.slice(req.params.id*20-20,req.params.id*20);
        res.json(arr);
    }
    getProduct(req, res) {
        let arr = db.product.slice(0,20);
        res.json(arr);
    }
}

module.exports = new Product;