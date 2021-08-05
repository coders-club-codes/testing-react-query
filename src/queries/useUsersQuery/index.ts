import { useQuery } from 'react-query';

import { ApiResponse, User } from '../../common/types';
import { api } from '../../services';

export const useUsersQuery = () =>
  useQuery(['users'], () => api.get<ApiResponse<User[]>>('/user'), {
    select: ({ data }) => data.data,
  });
