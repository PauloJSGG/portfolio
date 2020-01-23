import React, { useState } from 'react';

import { useTrail, animated } from 'react-spring'
import CasualPhoto from '../assets/Casual.JPG'
import './Home.scss'

const items = ['PAULO', 'GONÇALVES']
const config = { mass: 50, tension: 2000, friction: 400 }

const Home = (props) => {

  const [toggle, set] = useState(true)
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div className='home-container'>
      <div className='header'>
      {trail.map(({ x, height, ...rest }, index) => (
          <animated.h1
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.h1>
        ))}
      </div>
      <div className='body'>
        <img
          src={CasualPhoto}
          className='image'
        />
      </div>
    </div>
  )
}

export default Home;