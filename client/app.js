import React from 'react'
import {Footer} from './components'
import Routes from './routes'
import '../public/App.scss'

const App = () => {
  return (
    <div className="bg-light">
      <Routes />
      <Footer />
    </div>
  )
}

export default App
