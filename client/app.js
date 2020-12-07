import React from 'react'

import {NavCopy} from './components'
import Routes from './routes'
import '../public/App.scss'

const App = () => {
  return (
    <div className="bg-light">
      <NavCopy />
      <Routes />
    </div>
  )
}

export default App
