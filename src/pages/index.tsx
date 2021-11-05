import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import { ME } from '../queries/auth'
import styles from '../../styles/Home.module.scss'
import Page from '../components/Page'

export default function Home() {
  const {data} = useQuery(ME);

  return (
    <Page>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            {(!data?.me) && (
              <Link href="/login">
                Login &rarr;
              </Link>
            )}
            {(data?.me) && (
              <Link href="/profile">
                Profile &rarr;
              </Link>
            )}
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
    </Page>
  )
}
