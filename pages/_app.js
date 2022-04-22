import { SWRConfig } from 'swr'
import useSession from '@lib/session'
import './_app.css'
import Navigation from '@components/Navigation'

const fetcher = async (url, options) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    return Promise.reject(response)
  }

  const data = await response.json()
  return data
}

function MyApp({ Component, pageProps }) {
  const session = useSession()
  const newPageProps = {
    ...pageProps,
    session
  }


  return (
    <SWRConfig value={{ fetcher }}>
      <Navigation session={session} />
      <main className="app">
        <Component {...newPageProps} />
      </main>
    </SWRConfig>

  )
}

export default MyApp
