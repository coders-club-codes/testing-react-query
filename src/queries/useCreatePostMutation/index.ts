import { useMutation, useQueryClient } from 'react-query';

import { ApiResponse, Post } from '../../common/types';

export const newPost = {
  owner: {
    title: 'mr',
    firstName: 'Luke',
    lastName: 'Morales',
    gender: 'male',
    picture: 'https://avatars.githubusercontent.com/u/14251143?v=4',
    dateOfBirth: '',
    email: '',
    id: `${Date.now()}${Math.random()}`,
    phone: '',
    registerDate: new Date().toISOString(),
    location: {
      city: 'Santo Andre',
      country: 'Brazil',
      state: 'Sao Paulo',
      street: '',
      timezone: 'UTC-3',
    },
  },
  id: `${Date.now()}${Math.random()}`,
  image:
    'https://codersclub.com.br/wp-content/uploads/2021/07/code-1536x1152.jpeg',
  likes: 0,
  link: 'https://www.youtube.com/channel/UC9bVe2K6Jg4uiseKV7w38Zg',
  publishDate: new Date().toISOString(),
  tags: ['codersclub', 'luke morales', 'carlos levir'],
  text:
    'Mussum Ipsum, cacilds vidis litro abertis. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Sapien in monti palavris qui num significa nadis i pareci latim. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.',
} as Post;

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const queryKey = ['posts'];

  return useMutation(
    (error = false) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (error) {
            reject(new Error('Erro na promise'));
          }

          return resolve('sucesso');
        }, 10000),
      ),
    {
      onMutate: (_error?: boolean) => {
        const previousCache = queryClient.getQueryData<ApiResponse<Post[]>>(
          queryKey,
        );

        if (previousCache) {
          queryClient.setQueryData<ApiResponse<Post[]>>(queryKey, {
            ...previousCache,
            data: [newPost, ...previousCache.data],
          });
        }

        return { previousCache };
      },
      onError: (err, data, ctx) => {
        queryClient.setQueryData<ApiResponse<Post[]> | undefined>(
          queryKey,
          ctx?.previousCache,
        );
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    },
  );
};
