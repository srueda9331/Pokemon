import '../styles/pokemonDetail.css'
import circle from '../image/circle1.png'
import circleWhite from '../image/circulo-blanco.png'
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from "axios";


export function PokemonDetail(){
  const history = useHistory()
  const [pokemon, setPokemon] = useState(null)
  let {id} = useParams()


  useEffect(() => {
    axios.get('http://localhost:3001/pokemons/' + id )
    .then(res => {
      setPokemon(res.data)
    })
    .catch(error => {
      if(error.name === 'AxiosError'){
        alert("Sorry, the pokemon you're looking for doesn't exist")
        history.push('/home')
        setPokemon(null)
      }
    })
    return () => {
      setPokemon(null)
    }
  }, [history, id])
    
  
  return (
    <div>
      {
        pokemon? 
        <div className='alldetail'>
          <div className="detail1">
            <div className='pokemond1'>
            <h2>Id: <span style={{color:'black', fontSize:'26px'}}>{pokemon.id}</span></h2>
            
            <h2 className='title2-det'>Hi, I'm <span style={{color:'black', fontSize:'28px'}}>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</span>,</h2>
           
            <h3 style={{marginTop:'32px'}}>Pleased to meet you,</h3>
            <h3>All you need to know about me is on the right</h3>
            
            <img className='img-detail' src={pokemon.img? pokemon.img : pokemon.image} alt="Myimage" />
            </div>
          </div>

          <div className="detail2">
          <img style={{height: '151px', marginLeft:'-270px', marginBottom:'130px', zIndex:-1}}src={circle} />
          <img style={{height: '128px', marginLeft:'-139px', marginBottom:'141px', zIndex:1}}src={circleWhite} />
            <div className='pokemond2'>
              <h3>Life points: {pokemon.hp}</h3>
              <h3>Attack: {pokemon.attack}</h3>
              <h3>Defense: {pokemon.defense}</h3>
              <h3>Speed: {pokemon.speed} dm/sec</h3>
              {
                pokemon?.typeOne? <h3>Type One: {pokemon.typeOne[0].toUpperCase() + pokemon.typeOne.slice(1)}</h3> : false
              }
              {
                pokemon?.typeTwo? <h3>Type Two: {pokemon.typeTwo[0].toUpperCase() + pokemon.typeTwo.slice(1)}</h3> : false
              }
              {
                pokemon?.types? <h3>Type One: {pokemon.types[0]?.name[0].toUpperCase() + pokemon.types[0]?.name.slice(1)}</h3> : false
              }
              {
                pokemon?.types? <h3>Type Two: {pokemon.types[1]?.name[0].toUpperCase() + pokemon.types[1]?.name.slice(1)}</h3> : false
              }
          

              
              <h3>Height: {pokemon.height > 9? pokemon.height.toString()[0] + '.' + pokemon.height.toString()[1]: '0.' + pokemon.height } mts</h3>
              <h3>Weight: {pokemon.weight * 10 ** -1} Kg</h3>
              <Link to='/home'>
                <button className='button-detail'>Get back</button>
            </Link> 
           </div>
          </div> 
        </div>
        : 
        <div>
        <h3 id='load-detail'>Loading...</h3> <br />
        <img style={{marginTop:'-200px'}} src="https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif" alt="poke-load" />
        </div>
      }

     
    </div>
  )
    
   
     
   
}