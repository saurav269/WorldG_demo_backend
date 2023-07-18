const mongoose = require("mongoose");

const productKeySchema = mongoose.Schema({
  productKey: String,
  isActivated: Boolean,
  isExpired: Boolean,
  consumerName: String,
  email: String,
  consumerMobile: Number,
  address: String,
  city: String,
  pincode: Number,
  deviceIP:String,
  registerDate:String,
  dealerName: String,
  dealerCode: String,
  dealerMobile: Number,
  state: String,
  country: String
});

const productKeyModel = mongoose.model("demoProducts", productKeySchema);

module.exports = {
  productKeyModel
}
