import React from 'react'

import {Footer, NavCopy} from './components'
import Routes from './routes'
import '../public/App.scss'

const App = () => {
  return (
    <div className="bg-light">
      <NavCopy />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
