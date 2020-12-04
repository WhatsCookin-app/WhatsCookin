import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import '../public/App.scss'

const App = () => {
  return (
    <div className="bg-light">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
