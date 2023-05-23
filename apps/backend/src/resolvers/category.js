const resolvers = {
  Category: {
    products: async (parent, params, context) =>
      context.dataSources.productDS.getProductsByCategory(parent.code)
  },
  Query: {
    categories: async (parent, params, context) =>
      context.dataSources.categoryDS.getAllCategories(),

    category: async (parent, params, context) =>
      context.dataSources.categoryDS.getCategoryDetails(params.categoryCode)
  }
};

export default resolvers;
