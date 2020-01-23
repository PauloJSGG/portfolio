import React from 'react';
import CasualPhoto from '../assets/Casual.JPG'
import './Home.scss'

const Home = (props) => {
  return (
    <div className='home-container'>
      <div className='header'>
        <h1>PAULO GONÇALVES</h1>
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