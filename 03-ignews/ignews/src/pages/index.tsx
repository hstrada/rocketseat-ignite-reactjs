import Head from 'next/head';

import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ignews</title>
      </Head>
      <h1 className={styles.title}>Hello WOrld</h1>
    </>
  );
}
