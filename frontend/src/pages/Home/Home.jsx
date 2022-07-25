import React from 'react';
import {Hero, Carousel, AllPosts} from '../../containers';


const Home = () => {
  return (
    <div className='app__home app__width'>
      <Hero/>
      <Carousel title={"Recent Posts"}/>
    </div>
  )
}

export default Home