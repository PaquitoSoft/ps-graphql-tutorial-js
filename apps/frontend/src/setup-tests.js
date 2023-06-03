/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import { client } from './apollo-client';
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error'
  });
});

beforeEach(() => {
  // Ensure Apollo cache is cleared between tests.
  // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
  return client.clearStore()
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
// @ts-ignore
afterAll(() => server.close());
