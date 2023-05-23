const resolvers = {
  Query: {
    product: (parent, params, context) =>
      context.dataSources.productDS.getProductById(params.productId)
  }
};

export default resolvers;
