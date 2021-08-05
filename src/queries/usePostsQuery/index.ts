import { useQuery } from 'react-query';

import { ApiResponse, Post } from '../../common/types';
import { api } from '../../services';

export const usePostsQuery = () =>
  useQuery(
    ['posts'],
    () =>
      api.get<ApiResponse<Post[]>>('/post').then((response) => response.data),
    {
      select: ({ data }) => data,
    },
  );
