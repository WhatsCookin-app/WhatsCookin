import React from 'react'
import {Navbar} from 'react-bootstrap'

const VideoNavbar = () => {
  return (
    <div id="nav-top">
      <Navbar
        bg="navbar"
        className="justify-content-between"
        expand="sm"
        sticky="top"
      >
        <Navbar.Brand className="m-0">
          <img
            src="/img/brand-white.png"
            width="150"
            // height="30"
            className=""
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default VideoNavbar
