import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { createClient } from '../../services/prismic';

import Posts, { getStaticProps, Post } from '../../pages/posts';

const posts = [
  {
    slug: 'my-new-post',
    id: 'lorem ipsum',
    key: 'lorem ipsum',
    title: 'Meu novo Post',
    description: 'lorem ipsum',
    updatedAt: '12 de março de 2021'
  }
];

const postsPrismic = [
  {
    uid: 'lorem ipsum',
    id: 'lorem ipsum',
    key: 'lorem ipsum',
    data: {
      title: [{ type: 'heading', text: 'Meu novo Post' }],
      content: [{ type: 'paragraph', text: 'lorem ipsum' }],
      description: [{ type: 'paragraph', text: 'lorem ipsum' }]
    },
    last_publication_date: '03-12-2021',
    first_publication_date: '03-12-2021'
  }
];

jest.mock('../../services/prismic');
const mockedPrismic = createClient as jest.Mock;

describe('Posts page', () => {
  beforeAll(() => {
    mockedPrismic.mockReturnValue({
      getAllByType: () => {
        return Promise.resolve(postsPrismic);
      }
    });
  });
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('Meu novo Post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              id: 'lorem ipsum',
              slug: 'lorem ipsum',
              key: 'lorem ipsum',
              updatedAt: '2021 M03 12',
              title: [
                {
                  type: 'heading',
                  text: 'Meu novo Post'
                }
              ],
              description: 'lorem ipsum'
            }
          ]
        }
      })
    );
  });
});
