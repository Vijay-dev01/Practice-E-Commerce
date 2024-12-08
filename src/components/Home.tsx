import React from 'react'
import SimpleImageSlider from "react-simple-image-slider"
import img1 from "../assets/images/background.jpg"
import img2 from "../assets/images/background1.jpg"

interface Image {
  url: string;
}

const images: Image[] = [
  { url: img1 },
  { url: img2 }
]

const Home: React.FC = () => {
  return (
    <div className='sliding-img-container'>
      <div className='slider-body'>
      <SimpleImageSlider
        width={1000}
        height={500}
        images={images}
        showBullets={false}
        showNavs={true}
      />
      <p style={{color:"white"}}>hiusha oihhvakjsd hjvhakjdfv hjvhcjkfdv hjvkjcajdsv dkvbjadvda bjbvjbkjsbvbadvbbdavjbkb jbjkjsvj jbjvkbadbv jbkjbvsjbdf kjbjbvsjka</p>
      </div>
    </div>
  )
}

export default Home
