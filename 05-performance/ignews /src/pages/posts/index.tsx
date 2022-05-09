import Head from 'next/head'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../services/prismic'
import styles from './styles.module.scss'
import { PrismicLink } from '@prismicio/react'
import Link from 'next/link'

const getDescription = (slices) => {
  const { text } = slices.find((slice) => slice.type === 'paragraph')

  const excerpt = text.substring(0, 100)

  if (text.length > 100) {
    return excerpt.substring(0, excerpt.lastIndexOf(' ')) + '…'
  } else {
    return excerpt
  }
}

const Post = ({ post }) => {
  return (
    <>
      {post && (
        <Link href={`/posts/${post.slug}`}>
          <a key={post.key}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.description}</p>
          </a>
        </Link>
      )}
    </>
  )
}

export interface Post {
  id: string
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

  const articles = await client.getAllByType('Publication')

  const posts = articles.map((post) => {
    return {
      id: post.id,
      slug: post.uid,
      key: post.uid,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
      title: post.data.title,
      description: getDescription(post.data.description),
    }
  })

  return {
    props: {
      posts,
    },
  }
}
