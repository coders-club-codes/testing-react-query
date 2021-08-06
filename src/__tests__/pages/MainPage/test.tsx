import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { MainPage } from '../../../pages/MainPage';
import { server } from '../../../setupTests';
import { render } from '../../../tests';

describe('Pages | MainPage', () => {
  it('displays a loading indicator when the request is being made', () => {
    render(<MainPage />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('displays the data from api when request status is "success"', async () => {
    render(<MainPage />);

    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());

    expect(screen.getByText(/Sara Andersen/i)).toBeInTheDocument();
  });

  it('displays an error message when request status is "error"', async () => {
    server.use(rest.get('*', (req, res) => res.networkError('Error')));

    render(<MainPage />);

    await waitFor(() =>
      expect(screen.getByText(/ocorreu um erro/i)).toBeInTheDocument(),
    );
  });
});
