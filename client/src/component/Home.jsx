import React from 'react'
import Headers from './Headers';
import Navbar from './Navbar'
import Mainpage from './Mainpage';
import Explore from './Explore';
import Popular from './Popular'
import Salepage from './Salepage';
import Sofas from './Sofas';
import Page3 from './Page3';
import Slider from './Slider';
import Explorepage from './Explorepage';
import Footer from './Footer';

export default function Home() {
  return (
    <div>
        <Headers/>
      <Navbar navbar="navbarrrr"/>
      <Mainpage/>
      <Explore/>
      <Popular/>
      <Salepage/>
      <Sofas/>
      <Page3/>
      <Slider/><Explorepage/><Footer/>
    </div>
  )
}
