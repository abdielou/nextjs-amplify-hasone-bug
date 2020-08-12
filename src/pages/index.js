import Head from 'next/head'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import styles from '../../styles/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AmplifySignOut />
        <h1 className={styles.title}>
          Hello
        </h1>
      </main>

    </div>
  )
}

export default withAuthenticator(Home)