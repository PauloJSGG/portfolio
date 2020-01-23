import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './App.css'

import Home from './pages/Home'
import Social from './pages/Social'

const pages = [
  Home,
  Social
]

function App() {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    scale: 0.9,
    display: 'block'
  }))
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0)
      const scale = down ? 0.9 - distance / window.innerWidth / 2 : 0.9
      return { x, scale, display: 'block' }
    })
  })
  return props.map(({ x, display, scale }, i) => (
    <animated.div {...bind()} key={i} style={{ display, x }}>
      <animated.div style={{ scale }} >
        {pages[i].call()}
      </animated.div>
    </animated.div>
  ))
}

export default App
