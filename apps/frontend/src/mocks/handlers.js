import { graphql } from 'msw';

export const handlers = [
  graphql.query('LayoutDataQuery', (_req, res, ctx) => {
    return res(
      ctx.data({
        categories: [
          {
            code: "electronics",
            products: []
          },
          {
            code: "jewelery",
            products: []
          },
          {
            code: "men's clothing",
            products: []
          },
          {
            code: "women's clothing",
            products: []
          }
        ],
        cart: {
          totalUnits: 3
        }
      })
    );
  })
];
