import '../styles/Pokemon.css'
import React from "react";



export default function Pokemon({ name, img, attack, typeOne, typeTwo, message}){
  return (

      message? 
        ( <div>
          <p id='pokemon-message'>
            {message}
          </p>
          <img 
            id='img-poke-not-found' 
            src='https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112_960_720.png' 
            alt='empty-ball' />
          </div>
        ) 
        :
    
        (
          <div 
            className='container-pokemon'
          > 
              <p className='title-pokemon'>{name}</p>
              <img className='img' src={img} alt="pokemon" width='138px' height='138px' />
              <br/>
              <span className='attack'>Attack: {attack}</span>
              <br/>
              <span className='types'>{typeOne? typeOne : false}     {typeTwo? ` - ${typeTwo}` : false}</span>
          </div>
        )   
  )
}