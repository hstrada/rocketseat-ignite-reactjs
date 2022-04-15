import Head from 'next/head'
import { createClient } from '../../services/prismic'
import styles from './styles.module.scss'
import * as prismicH from '@prismicio/helpers'

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === 'publications')
    .map((slice) => prismicH.asText(slice.primary.title))
    .join(' ')

  const excerpt = text.substring(0, 300)

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(' ')) + '…'
  } else {
    return excerpt
  }
}

const getDescription = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === 'publications')
    .map((slice) => prismicH.asText(slice.primary.description))
    .join(' ')

  const excerpt = text.substring(0, 300)

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(' ')) + '…'
  } else {
    return excerpt
  }
}

const Post = ({ post }) => {
  return (
    <>
      {post && (
        <a key={post.key}>
          <time>{post.updatedAt}</time>
          <strong>{post.title}</strong>
          <p>{post.description}</p>
        </a>
      )}
    </>
  )
}

interface Post {
  slug: string
  key: string
  updatedAt: string
  title: string
  description: string
}

interface PostsProps {
  posts: Array<Post>
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Post key={post.key} post={post} />
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const articles = await client.getAllByType('Posts')

  const posts = articles.map((post) => {
    return {
      slug: post.id,
      key: post.id,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      title: getExcerpt(post.data.slices),
      description: getDescription(post.data.slices),
    }
  })

  return {
    props: {
      posts,
    },
  }
}
