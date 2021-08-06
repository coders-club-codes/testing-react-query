/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { Posts } from '../../../pages/Posts';
import { server } from '../../../setupTests';
import { render } from '../../../tests';

describe('Pages | Posts', () => {
  it('displays a loading indicator when the request is being made', () => {
    render(<Posts />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('displays the data from api when request status is "success"', async () => {
    render(<Posts />);

    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());

    const postWithContent = screen.getByText(/sara/i).parentElement;

    expect(postWithContent).toBeInTheDocument();

    const postSelector = within(postWithContent!);
    expect(postSelector.getByRole('img')).toBeInTheDocument();
    expect(
      postSelector.getByText(/adult Labrador retriever/i),
    ).toBeInTheDocument();
  });

  it('displays an error message when request status is "error"', async () => {
    server.use(rest.get('*', (req, res) => res.networkError('Error')));

    render(<Posts />);

    await waitFor(() =>
      expect(screen.getByText(/ocorreu um erro/i)).toBeInTheDocument(),
    );
  });

  it('creates a new post when clicking the button', async () => {
    render(<Posts />);

    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /criar post/i }));

    const postsList = screen.getByRole('list');

    await waitFor(() =>
      expect(within(postsList).getByText(/luke/i)).toBeInTheDocument(),
    );
  });
});
