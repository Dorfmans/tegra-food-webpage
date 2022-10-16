import '../styles/globals.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const auth = typeof window !== 'undefined' ? localStorage.getItem('email') : null

  useEffect(() => {
    if (auth === null) {
      router.push('/login')
    }
  }, [auth])

  return <Component {...pageProps} />
}

export default MyApp
