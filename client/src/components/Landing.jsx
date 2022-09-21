import '../styles/Landing.css'
import React from "react";
import { Link } from "react-router-dom";

export default function Main(){


  return (
    <div className='background-main'>
      <h3 className='initial-text'>Welcome To The Site Where You Could Find Some Info About Pokemons!</h3>
      <Link to='/home'>
        <button className='main-button'>Go ahead!</button>
      </Link>
    </div>
  )
}