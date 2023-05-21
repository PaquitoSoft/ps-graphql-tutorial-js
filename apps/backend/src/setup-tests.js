/* eslint-disable no-undef */
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { createAppYoga } from './graphql-server';
import { mockServer } from './mocks/server';

global.__foo = '';

// Establish API mocking before all tests.
beforeAll(() => {
  mockServer.listen({
    onUnhandledRequest: 'error'
  });

  const yoga = createAppYoga();
  global.__graphqlExecutor = buildHTTPExecutor({
    fetch: yoga.fetch
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServer.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockServer.close());
