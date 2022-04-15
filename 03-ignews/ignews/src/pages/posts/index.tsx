import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from '../../services/prismic'
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>18 de março de 2022</time>
            <strong>Lorem ipsum generator</strong>
            <p>Lorem ipsum generator paragraph description</p>
          </a>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const articles = await client.getAllByType('Posts')

  console.log(articles)

  return {
    props: {
      articles,
    },
  }
}
