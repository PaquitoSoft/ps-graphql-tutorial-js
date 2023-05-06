import mongoose, { Schema } from "mongoose";

const ShopCartItemSchema = new Schema(
  {
    quantity: { type: Number, default: 0 },
    product: {
      id: Number,
      title: String,
      price: Number,
      image: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const ShopCartSchema = new Schema({
  userId: String,
  items: [ShopCartItemSchema]
});

ShopCartSchema.virtual('totalUnits').get(function() {
	const total = this.items.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);
	return total;
});

ShopCartSchema.virtual('totalAmount').get(function() {
	const total = this.items.reduce((acc, item) => {
		return acc + item.product.price * item.quantity;
	}, 0).toFixed(0);
	return total;
});

export default mongoose.model('ShopCart', ShopCartSchema);
