import Head from 'next/head';
import Button from '../components/Button';

import styles from './styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ignews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏🏼 Hey, welcome!</span>
          <h1>
            News about the <span>React</span> world.
          </h1>

          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>

          <Button.Subscribe />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
