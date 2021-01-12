const router = require("express").Router();
const productCtrl = require('../controllers/productCtrl')

router.route("/product")
.get(productCtrl.getProducts)
.post(productCtrl.createProduct);

router.route("/product/:id")
.delete(productCtrl.deleteProducts)
.put(productCtrl.updateProducts);

module.exports = router;
