import path from 'node:path';
import { readFileSync } from 'node:fs';
import {
  createSchema,
  createYoga
} from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

import authRequiredDirective from './directives/auth-required';
import ShopCartModel from './db/models/shop-cart.model';
import CategoryDataSource from './datasources/category-data-source';
import ProductDataSource from './datasources/product-data-source';
import ShopCartDataSource from './datasources/shopcart-data-source';

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

const { authDirectiveTypeDef, authDirectiveTransformer } = authRequiredDirective();

function createAppSchema() {
  const schema = createSchema({
    typeDefs: [authDirectiveTypeDef, typeDefs],
    resolvers
  });
  return authDirectiveTransformer(schema);
}

export function createAppYoga() {
  return createYoga({
    maskedErrors: false,
    schema: createAppSchema(),
    context({ request, params }) {
      // Header => Authorization: Bearer <token>
      const authHeader = request.headers.get('Authorization');
      return {
        request,
        params,
        userId: authHeader ? authHeader.split(' ')[1] : undefined,
        dataSources: {
          categoryDS: new CategoryDataSource(),
          productDS: new ProductDataSource(),
          shopCartDS: new ShopCartDataSource(ShopCartModel),
        }
      }
    }
  });
}
