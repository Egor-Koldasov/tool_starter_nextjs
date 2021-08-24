import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://127.0.0.1:3000/api/hello');
  const hello = await res.json();
  console.log('hello', hello);
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return {props: hello};
};

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login page
        </h1>

        <div className={styles.grid}>
          <Link href="/">
            Home &rarr;
          </Link>

          <Link href="/profile">
            Profile &rarr;
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

