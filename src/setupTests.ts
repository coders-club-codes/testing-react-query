/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { QueryClient, setLogger } from 'react-query';

import { handlers } from './mocks/handlers';

export const server = setupServer(...handlers);

export const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off for testing
      retry: false,
    },
  },
});

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
  testingQueryClient.clear();
});

afterAll(() => {
  server.close();
});

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more react query errors on the console
  error: () => null,
});
