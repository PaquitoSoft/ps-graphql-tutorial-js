import { rest } from 'msw';
import { allCategories } from './data/categories';

const baseUrl = process.env.ECOMMERCE_API_BASE_URL;

export const handlers = [
  rest.get(`${baseUrl}/products/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(allCategories)
    )
  }),
];
