import React from 'react'
import {Carousel} from 'react-bootstrap'

const ChannelsCarousel = () => {
  return (
    <div className="d-flex justify-content-center">
      <Carousel className="channels-banner mt-3">
        <Carousel.Item interval={5000}>
          <img
            className="channels-banner"
            src="/img/YourFeed.png"
            alt="Check out your feed below to see recipes!"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="channels-banner"
            src="/img/cookingmeet.png"
            alt="click live cooking to video chat"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default ChannelsCarousel
