import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../services/prismic'
import { PrismicText } from '@prismicio/react'
import Head from 'next/head'

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>
      <main>
          <article>
              
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

  return {
    props: {
      post,
    },
  }
}
