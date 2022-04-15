import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { createClient } from '../../services/prismic'
import Head from 'next/head'
import { PrismicRichText } from '@prismicio/react'
import styles from './post.module.scss'

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent}>
            <PrismicRichText field={post.description} />
          </div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  previewData,
  params,
  req,
}) => {
  const session = await getSession({ req })
  const { slug } = params

  const client = createClient({ previewData })
  const post = await client.getByUID('Publication', String(slug))

  const formattedPost = {
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
    title: post.data.title,
    description: post.data.description,
  }

  console.log(formattedPost)

  return {
    props: {
      post: formattedPost,
    },
  }
}
