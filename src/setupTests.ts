/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { QueryClient, setLogger } from 'react-query';


export const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off for testing
      retry: false,
    },
  },
});


afterEach(() => {
  testingQueryClient.clear();
});

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more react query errors on the console
  error: () => null,
});
