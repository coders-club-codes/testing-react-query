import { useUsersQuery } from '../../queries';

export const MainPage = () => {
  const usersQuery = useUsersQuery();

  return (
    <main>
      <h1>Users</h1>

      {usersQuery.isLoading && <p>Carregando...</p>}

      {usersQuery.isError && <p>Ocorreu um erro</p>}

      {usersQuery.isSuccess && (
        <ul>
          {usersQuery.data.map((user) => (
            <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
          ))}
        </ul>
      )}
    </main>
  );
};
