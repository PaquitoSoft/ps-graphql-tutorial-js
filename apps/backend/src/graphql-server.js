import path from 'node:path';
import { readFileSync } from 'node:fs';
import {
  createSchema,
  createYoga
} from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

export function createAppYoga() {
  return createYoga({
    maskedErrors: false,
    schema: createSchema({
      typeDefs,
      resolvers
    })
  });
}
