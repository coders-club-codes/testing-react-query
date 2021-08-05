import { AxiosError } from 'axios';
import { QueryClient } from 'react-query';

import { IS_PROD } from '../../constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, err) => {
        if (!IS_PROD) {
          return false;
        }

        const error = err as AxiosError;

        if (error.isAxiosError && error.response) {
          const errStatus = error.response?.status;

          const isErrorWithinRequestErrorsRange =
            errStatus >= 400 && errStatus < 500;

          if (isErrorWithinRequestErrorsRange) {
            return false;
          }
        }

        return failureCount <= 3;
      },
      refetchOnWindowFocus: IS_PROD,
    },
  },
});
