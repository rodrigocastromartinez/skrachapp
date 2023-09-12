'use client'

import './globals.css'
import 'material-symbols'
import AppContext from './AppContext'
import Loader from './library/Loader'
import Alert from './components/Alert'
import { useState } from 'react'

const { Provider} = AppContext

export default function App({ children }: {children: React.ReactNode}) {
  const [loader, setLoader] = useState<boolean>()
  const [feedback, setFeedback] = useState<{message: string, level: string} | undefined >(undefined)

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  const handleShowAlert = (message: string, level = 'error') => setFeedback({ message, level })

  const handleAcceptAlert = () => setFeedback(undefined)

    return <Provider value={{ alert: handleShowAlert, freeze, unfreeze }}>
        {children}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
  </Provider>
}