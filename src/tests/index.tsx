import { PropsWithChildren, ReactElement } from 'react';

import {
  render as originalRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { QueryClientProvider } from 'react-query';

import { testingQueryClient } from '../setupTests';

type RenderFunction = (
  ui: ReactElement,
  options?: RenderOptions,
) => RenderResult;

export const wrapper = ({ children }: PropsWithChildren<unknown>) => (
  <QueryClientProvider client={testingQueryClient}>
    {children}
  </QueryClientProvider>
);

export const render: RenderFunction = (ui, options) =>
  originalRender(ui, {
    wrapper,
    ...options,
  });
