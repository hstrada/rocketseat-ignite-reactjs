import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';
import { mocked } from 'ts-jest/utils';
import Home from '../../pages';
import { getServerSideProps } from '../../pages';
import { createClient } from '../../services/prismic';

jest.mock('next/router');

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        data: null,
        status: 'unauthenticated'
      };
    }
  };
});
jest.mock('@prismicio/client');
jest.mock('../../services/stripe');

const mockedPrismic = createClient as jest.Mock;

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />);

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
  });
  it('loads initial data', async () => {
    const stripeMocked = mocked(stripe.prices.retrieve);

    stripeMocked.mockResolvedValueOnce({
      id: 'fake-id',
      unit_amount: 1000
    } as any);

    const response = await getServerSideProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            amount: '$10.00',
            priceId: 'fake-id'
          },
          revalidate: 86400
        }
      })
    );
  });
});
