import { useCreatePostMutation, usePostsQuery } from '../../queries';

export const Posts = () => {
  const postsQuery = usePostsQuery();
  const createPostMutation = useCreatePostMutation();

  const createPost = () => {
    createPostMutation.mutate(false);
  };

  return (
    <main>
      <h1>Posts</h1>

      <button type="button" onClick={createPost}>
        Criar Post
      </button>

      {postsQuery.isLoading && <p>Carregando...</p>}

      {postsQuery.isError && <p>Ocorreu um erro</p>}

      {postsQuery.isSuccess && (
        <ul>
          {postsQuery.data.map((post) => (
            <li
              key={post.id}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <strong>{post.owner.firstName}</strong>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.appId}
                  width={200}
                  height={200}
                />
              )}
              {post.text}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
