import React, {useState} from 'react'
import {Footer} from './components'
import Routes from './routes'
import '../public/App.scss'

const App = () => {
  const [background, setBackground] = useState(false)
  return (
    <div className={!background ? 'bg-light' : 'bg-dark'}>
      <Routes />
      <Footer change={setBackground} />
    </div>
  )
}

export default App
