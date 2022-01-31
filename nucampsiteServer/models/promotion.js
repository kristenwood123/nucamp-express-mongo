const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    featured: true,
  },
  image: {
    type: String,
    featured: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  cost: {
    type: Currency,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    featured: true,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);
module.exports = Promotion;
