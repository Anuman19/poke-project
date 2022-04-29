import { SWRConfig } from 'swr'
import useSession from '@lib/session'
import './_app.css'
import Navigation from '@components/Navigation'
import Link from "next/link"
import Footer from '@components/Footer'

const fetcher = async (url, options) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    return Promise.reject(response)
  }

  const data = await response.json()
  return data
}

export default function MyApp({ Component, pageProps }) {
  const session = useSession()
  const newPageProps = {
    ...pageProps,
    session
  }
  //console.log(newPageProps)


  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Navigation session={session} />
        <h1 style={{ textAlign: "center", color: "#044a4f" }}><Link href="/">| Leximon |</Link></h1>
        <main className="app">
          <Component {...newPageProps} />
        </main>
        <Footer session={session} />
      </SWRConfig>
    </>
  )
}

