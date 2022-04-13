import Head from 'next/head'
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