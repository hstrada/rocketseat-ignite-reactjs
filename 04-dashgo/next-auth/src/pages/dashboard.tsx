import Head from 'next/head'
import { Can } from '../components/Can'

import { useAuth } from '../contexts/AuthContext'
import { setupAPIClient } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main>
        <h1>Dashboard: {user?.email}</h1>

        <button onClick={signOut}>Sign out</button>

        <Can permissions={['metrics.list']}>
          <div>Métricas</div>
        </Can>
      </main>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/me')

  return {
    props: {},
  }
})
