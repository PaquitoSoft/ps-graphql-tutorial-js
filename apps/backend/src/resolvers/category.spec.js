import { parse } from 'graphql';
import { mockRestRequest, sendFakeGraphqlRequest } from '../utils/test-utils';
import { allCategories } from '../mocks/data/categories';
import { categoryProducts as mockCategoryProducts } from '../mocks/data/products';

describe('categories resolver', () => {
  it('should load all categories', async () => {
    const result = await sendFakeGraphqlRequest({
      document: parse(/* GraphQL */`
        query GetAllCategories {
          categories {
            code
          }
        }
      `)
    });

    expect(result.data.categories).toEqual(
      allCategories.map(categoryCode => ({ code: categoryCode }))
    );
  });

  it('should load a category with its products', async () => {
    const mockCategoryCode = 'category-B';
    mockRestRequest({
      url: `/products/category/${mockCategoryCode}`,
      responseData: mockCategoryProducts
    });

    const { data } = await sendFakeGraphqlRequest({
      document: parse(/* GraphQL */`
        query GetCategory {
          category(categoryCode: "${mockCategoryCode}") {
            code
            products {
              id
              title
            }
          }
        }
      `)
    });

    expect(data.category.code).toBe(mockCategoryCode);
    expect(data.category.products).toEqual(
      mockCategoryProducts.map(product => ({
        id: product.id,
        title: product.title,
      }))
    );
  });
});
