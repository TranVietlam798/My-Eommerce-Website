const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("./payment")
  .get(auth, authAdmin, paymentCtrl.getPayment)
  .post(auth, authAdmin, paymentCtrl.createPayment);

module.exports = router;
