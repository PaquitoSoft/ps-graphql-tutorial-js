import { RESTDataSource } from "@apollo/datasource-rest";

const productTransformer = (restProduct) => ({
  id: restProduct.id,
  title: restProduct.title,
  price: restProduct.price,
  description: restProduct.description,
  image: restProduct.image
});

class ProductRestDataSource extends RESTDataSource {

  async getProductsByCategory(categoryCode) {
    const restProducts = await this.get(`https://fakestoreapi.com/products/category/${categoryCode}`);

    return restProducts.map(productTransformer);
  }

  async getProductById(productId) {
    const restProduct = await this.get(`https://fakestoreapi.com/products/${productId}`);

    return productTransformer(restProduct);
  }

}

export default ProductRestDataSource;
