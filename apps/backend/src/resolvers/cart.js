const resolvers = {
  Query: {
    cart(_parent, _params, { userId, dataSources }) {
      return dataSources.shopCartDS.getUserShopCart(userId);
    },
  },

  Mutation: {
    async addProductToCart(_parent, params, { userId, dataSources }) {
      // await new Promise(resolve => setTimeout(resolve, 3000));
      const product = await dataSources.productDS.getProductById(params.cartItem.productId);
      const updatedShopCart = await dataSources.shopCartDS.addProduct(product, userId);

      return updatedShopCart;
    },

    async removeProductFromCart(_parent, params, { userId, dataSources }) {
      return dataSources.shopCartDS.removeProduct(params.productId, userId);
    },

    async checkout(_parent, _params, { userId, dataSources }) {
      return dataSources.shopCartDS.checkout(userId);
    }
  }
}

export default resolvers;
