import React from 'react'

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="">
        <a href="#nav-top">
          <div className="text-center">
            <span>Back to top</span>
          </div>
        </a>
        <div />
        {/* <img className="mr-1 logo-2" src="https://www.gracehopper.com/images/gh-logo-sm-w-h_1.svg" alt="Grace Hopper Logo" /> */}
        <span className="text-white">
          Project by{' '}
          <a
            href="https://www.linkedin.com/in/mikyla-yufan-zhang-811047139/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mikyla Yufan Zhang
          </a>{' '}
          |{' '}
          <a
            href="https://www.linkedin.com/in/lidia-de-la-cruz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lidia De La Cruz
          </a>{' '}
          |{' '}
          <a
            href="https://www.linkedin.com/in/kadecahe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kade Cahe
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
