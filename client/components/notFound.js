import React from 'react'

const NotFound = props => {
  return (
    <div>
      {props.check ? <h1>Recipe not found</h1> : <h1> Not checked </h1>}
    </div>
  )
}

export default NotFound
