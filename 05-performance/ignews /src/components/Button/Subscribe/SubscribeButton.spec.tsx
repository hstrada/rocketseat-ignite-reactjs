import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Subscribe } from '.';

jest.mock('next/router');

jest.mock('next-auth/react');

describe('SignIn Button component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    });

    render(<Subscribe />);

    expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
  });
  it('redirects user to signin', () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    });

    render(<Subscribe />);

    const subscribeButton = screen.getByText('Subscribe Now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects user to posts', () => {
    const useRouterMocked = mocked(useRouter);

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        expires: '',
        user: { name: 'John Doe' },
        activeSubscription: 'fake-activeSubscription'
      },
      status: 'authenticated'
    });

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<Subscribe />);

    const subscribeButton = screen.getByText('Subscribe Now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
  });
});
