import { renderHook } from '@testing-library/react-hooks';

import { ApiResponse, Post } from '../../../common/types';
import { useCreatePostMutation, newPost } from '../../../queries';
import { testingQueryClient } from '../../../setupTests';
import { wrapper } from '../../../tests';

describe('Queries | useCreatePostMutation', () => {
  const renderMutationHook = () =>
    renderHook(useCreatePostMutation, {
      wrapper,
    });

  const getCache = () =>
    testingQueryClient.getQueryData<ApiResponse<Post[]>>(['posts']);

  beforeEach(() => {
    testingQueryClient.setQueryData<ApiResponse<Post[]>>(['posts'], {
      data: [],
    });
  });

  it('mutates the current cache adding the new post to the cache', async () => {
    const { result, waitFor } = renderMutationHook();

    result.current.mutate(undefined);
    await waitFor(() => result.current.isLoading);

    expect(getCache()?.data).toContainEqual(newPost);
  });

  it('resets the mutate cache back to the initial when there is an error', async () => {
    jest.useFakeTimers();
    const { result, waitFor } = renderMutationHook();

    result.current.mutate(true);
    await waitFor(() => result.current.isLoading);

    expect(getCache()?.data).toContainEqual(newPost);

    jest.advanceTimersByTime(15000);

    await waitFor(() => result.current.isError);

    expect(getCache()?.data).toEqual([]);

    jest.useRealTimers();
  });

  it('calls the invalidate queries method with the posts key', async () => {
    jest.useFakeTimers();

    const spyInvalidateQueries = jest.spyOn(
      testingQueryClient,
      'invalidateQueries',
    );
    const { result, waitFor } = renderMutationHook();

    result.current.mutate(undefined);
    await waitFor(() => result.current.isLoading);

    jest.advanceTimersByTime(15000);

    await waitFor(() => result.current.isSuccess);

    expect(spyInvalidateQueries).toHaveBeenCalledWith(['posts']);
    jest.useRealTimers();
  });
});
