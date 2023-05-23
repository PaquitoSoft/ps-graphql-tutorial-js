import { RESTDataSource } from "@apollo/datasource-rest";

class CategoryRestDataSource extends RESTDataSource {

  async getAllCategories() {
    const categoryCodes = await this.get('https://fakestoreapi.com/products/categories');

    return categoryCodes.map(categoryCode => ({
      code: categoryCode
    }));
  }

  async getCategoryDetails(categoryCode) {
    const categories = await this.getAllCategories();

    return categories.find(category => category.code === categoryCode);
  }

}

export default CategoryRestDataSource;
