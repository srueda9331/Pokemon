import '../styles/pokemon.css'
import React from "react";



export default function Pokemon({id, name, img, attack, defense, typeOne, typeTwo, message}){
  return (

      message? 
      ( <div>
        <img src='https://i.gifer.com/7A6L.gif' />
        </div>) :
    
    
    (<div key={id} className='container-pokemon'> 
        
        <h3 className='title-pokemon'>{name}</h3>
        <img className='img' src={img} alt="pokemon" width='138px' height='138px' />
        <h4 className='attack'>Attack: {attack}</h4>
        <h5 className='types'>{typeOne? typeOne : false}     {typeTwo? ` - ${typeTwo}` : false}</h5>

    </div>)   

    
  )
}