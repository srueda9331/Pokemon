import React from 'react'
import Pokemon from './Pokemon'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/Pokemons.css'

function Pokemons({pokemons, currentPokemons}) {
  return (
    <div className='cards-container' >
      
    {
    pokemons[0]?  
    
      currentPokemons.map(pokemon => {
          return (
            pokemon.message? 
            (<Pokemon key={`loading-message`} message={pokemon.message} /> )
            :
            (<section >
            
              <div className="pokemons">
                <Link 
                  key={pokemon.id.toString()}
                  to={'/home/' + pokemon.id} >
                  <Pokemon 
                    name={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} 
                    img={pokemon.img} 
                    attack={pokemon.attack} 
                    typeOne={pokemon?.typeOne? pokemon.typeOne?.[0].toUpperCase() + pokemon.typeOne?.slice(1) : false}
                    typeTwo={pokemon?.typeTwo? pokemon?.typeTwo?.[0].toUpperCase() + pokemon?.typeTwo?.slice(1) : false}
                  />
                </Link>
                </div> 
            </section>   
            )           
          )
          
        }):
        <div className='content'>
          <h2 className='title-loading'>Loading...</h2>
          <img className='pokeball' src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="poke-ball" />
        </div>
    } 
    </div>
  )
}

export default Pokemons;
