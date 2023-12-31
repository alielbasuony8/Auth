/* eslint-disable no-unused-vars */
import React from 'react'
import heroPhoto from "../assets/pngegg.png"
const Home = () => {
  return (
    <main>
      <section className="home">
        <div className='left'>
          <h1>Practice on Authenitication</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus magni expedita, alias nostrum nesciunt saepe aliquid architecto unde delectus obcaecati distinctio, enim quos mollitia adipisci id natus repudiandae, esse nemo.</p>
        </div>
        <div className='right'>
          <img src={heroPhoto} alt="hero photo" />
        </div>
      </section>
    </main>
  )
}

export default Home
