import React from 'react'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import '../../styles/globals.css'

Amplify.configure(config)
Amplify.Logger.LOG_LEVEL = 'INFO'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
