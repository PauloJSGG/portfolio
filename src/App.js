import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'
import './App.css'


function App() {
  const [state, toggle] = useState(true)
  const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
  return (
    <div className="app-container">
      <div onClick={() => toggle(!state)}>
        <animated.div
          style={{
            opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
            transform: x
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
              })
              .interpolate(x => `scale(${x})`)
          }}>
          wtfsdafsdfsad
        </animated.div>
      </div>
    </div>
  )
}

export default App;
