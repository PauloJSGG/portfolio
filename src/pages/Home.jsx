import React, { useState } from 'react';
import { useSpring,useTrail, animated, to } from 'react-spring'
import { useDrag, useGesture } from 'react-use-gesture'
import CasualPhoto from '../assets/Casual.JPG'

import ascii from '../assets/ascii'
import './Home.scss'

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20

const wheel = y => {
  const imgHeight = window.innerWidth * 0.3 - 20
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`
}

document.addEventListener('gesturestart', e => e.preventDefault())
document.addEventListener('gesturechange', e => e.preventDefault())

const imgs = ['https://s1.cdn.autoevolution.com/images/news/jsutai-bmw-e30-m3-is-one-of-a-kind-photo-gallery-79014_1.jpg']
// const items = ['PAULO', 'GONÇALVES']
// const config = { mass: 50, tension: 2000, friction: 400 }

const Home = (props) => {

  const domTarget = React.useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, set] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  const [{ wheelY }, setWheel] = useSpring(() => ({ wheelY: 0 }))
  const [drag, setDrag] = React.useState(false)

  const bind = useGesture(
    {
      // onDragStart: () => setDrag(true),
      // onDrag: ({ offset: [x, y] }) => set({ x, y, rotateX: 0, rotateY: 0, scale: 1 }),
      // onDragEnd: () => setDrag(false),
      // onPinch: ({ offset: [d, a] }) => set({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging && set({ rotateX: calcX(py, y.getValue()), rotateY: calcY(px, x.getValue()), scale: 1.1 }),
      onHover: ({ hovering }) => !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ offset: [, y] }) => setWheel({ wheelY: y })
    },
    { domTarget, event: { passive: false } }
  )

  React.useEffect(bind, [bind])

  // const [toggle, set] = useState(true)
  // const trail = useTrail(items.length, {
  //   config,
  //   opacity: toggle ? 1 : 0,
  //   x: toggle ? 0 : 20,
  //   height: toggle ? 80 : 0,
  //   from: { opacity: 0, x: 20, height: 0 },
  // })

  return (
    <div className='home-container'>
      {/* <div className='header'>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.h1
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.h1>
        ))}
      </div> */}


      <div className='header'>
        <div className='icons'>
          <svg width="100%" height="100%" >
            <circle  cx="10" cy="8" r="5" fill="rgb(79.2%, 0%, 0%)"/>
          </svg>
          <svg width="100%" height="100%" >
            <circle  cx="10" cy="8" r="5" fill="rgb(96.4%, 89.9%, 0%)"/>
          </svg>
          <svg width="100%" height="100%" >
            <circle  cx="10" cy="8" r="5" fill="rgb(9.4%, 88.2%, 0%)"/>
          </svg>
        </div>
      </div>
      <div className="body">
        <div className="container">
          <div className="ascii">
            {ascii.map(item => <span>{item}</span>)}
          </div>
        </div>
        <div className="container container--center">
          <div className="test">
            <h1>PAULO GONÇALVES</h1>
          </div>
        </div>
      </div>




      {/* <animated.div
        ref={domTarget}
        className={`${drag ? 'dragging' : ''}`}
        style={{ transform: 'perspective(600px)', x, y, scale: to([scale, zoom], (s, z) => s + z), rotateX, rotateY, rotateZ }}
      >
        <animated.div
          ref={domTarget}
          className={`${drag ? 'dragging' : ''}`}
          style={{ transform: 'perspective(600px)', x, y, scale: to([scale, zoom], (s, z) => s + z), rotateX, rotateY, rotateZ }}
        >
          <animated.div style={{ transform: wheelY.to(wheel) }}>
            {imgs.map((img, i) => (
              <div key={i} style={{ backgroundImage: `url(${img})` }} />
            ))}
          </animated.div>
      </animated.div>
    </animated.div> */}

      {/* <div className='body'>
        <img
          src={CasualPhoto}
          className='image'
        />
      </div> */}
    </div>
  )
}

export default Home;