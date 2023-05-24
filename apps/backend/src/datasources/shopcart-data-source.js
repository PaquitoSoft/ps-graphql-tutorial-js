class ShopCartsAPI {
  #model;
  constructor(shopCartModel) {
    this.#model = shopCartModel;
  }

  async #findOrCreateUserCart(userId) {
    let shopCart = await this.#model.findOne({ userId });
    if (!shopCart) {
      shopCart = new this.#model({
        userId,
        items: [],
      });
      shopCart = await shopCart.save();
    }
    return shopCart;
  }

  async getUserShopCart(userId) {
    const shopCart = await this.#findOrCreateUserCart(userId);
    return {
      id: shopCart.id,
      userId,
      items: shopCart.items.map(item => ({
        quantity: item.quantity,
        product: item.product,
      })),
      totalAmount: shopCart.totalAmount,
      totalUnits: shopCart.totalUnits
    };
  }

  async addProduct(product, userId) {
    const shopCart = await this.#findOrCreateUserCart(userId);
    const shopCartItem = shopCart.items.find(item => item.product.id === product.id);

    if (!shopCartItem) {
      shopCart.items.push({
        quantity: 1,
        product: {
          id: product.id,
          image: product.image,
          price: parseInt(product.price, 10),
          title: product.title
        }
      });
    } else {
      shopCartItem.quantity += 1;
    }

    return (new this.#model(shopCart)).save();
  }

  async removeProduct(productId, userId) {
    const shopCart = await this.#findOrCreateUserCart(userId);
    const cartItemIndex = shopCart.items.findIndex(item => item.product.id === productId);

    if (cartItemIndex === -1) throw new Error(`No product found in user's cart with ID: ${productId}`);

    shopCart.items.splice(cartItemIndex, 1);

    return shopCart.save();
  }

  async checkout(userId) {
    const shopCart = await this.#findOrCreateUserCart(userId);
    const orderId = shopCart.id;
    await shopCart.deleteOne();
    return orderId;
  }
}

export default ShopCartsAPI;
