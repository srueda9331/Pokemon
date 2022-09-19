import '../styles/Home.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, pokemonsInDb, orderByName, orderByAttack, findType, getTypesNames } from "../actions";
import { Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import Paginate from "./Paginate";
import { SearchBar } from "./SearchBar";


export default function Home(){
  const pokemons = useSelector(state => state.pokemons)
  const allTypes = useSelector(state => state.types)
  const [currentPage, setCurrentPage ] = useState(1)
  const [pokemonsPerPage, setPokemonP] = useState(12)
  const [order, setOrder] = useState('')
  const idxofLastPokemon = currentPage * pokemonsPerPage
  const idxofFirstPokemon = idxofLastPokemon - pokemonsPerPage  
  const currentPokemons = pokemons.slice(idxofFirstPokemon, idxofLastPokemon)
  window.scroll(0,0)


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTypesNames())
  }, [dispatch])

  function handleClick(e){
    e.preventDefault();
    window.location.reload()
  }

  function handleAllPokemons(e){
    dispatch(pokemonsInDb(e.target.value))
  }


  function handleSort(e){
    e.preventDefault();
    console.log(e.target.value);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }

  function findTypes(e){
   dispatch(findType(e.target.value))
  }

  function handleAttack(e){
    e.preventDefault();
    
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }


  return (
    
    <div className='home'>
      <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <br />
      <div className='filters'>
        <div className='alp-strong'>
          <p className='all-byMe'>ORDER BY:</p>
        <select className='selects' onClick={e => {handleSort(e)}} name="" id="">
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A Order</option> 
        </select>

        <select className='selects' style={{marginTop: '10px'}} onClick={e => {handleAttack(e)}} name="" id="">
          <option value='strong'>Stronger to Weaker</option>
          <option value='weak'>Weaker to Stronger</option>
          <option value='all'>Set initial state</option>
        </select>

        </div>
        <p className='all-byMe' >FILTER BY SOURCE:</p>
        <select className='selects' onClick={e => {handleAllPokemons(e)}} name="" id="">
          <option value='all'>All my pokemons</option>
          <option value='created'>Created By Me</option>
          <option value='fromAPI'>From the API</option>
        </select>
        <p className='all-byMe' >FILTER BY TYPE:</p>
        <select className='selects' onClick={findTypes}>
          <option value='All'>All</option>
        {
          allTypes.map(el => <option value={el.name}>{el.name}</option>)
        }
      
          </select>
        <div className='create-show'>
          <Link to='/pokemon' className='create-link'>
           <button className='creat' to='/pokemon' >Create Pokemon!</button>
        </Link>
        </div>
        <div>
          <button className='show' onClick={(e) => handleClick(e)}>
            Start Again
          </button>
        </div>
        </div> 
       

      <div>
     
      <div className='pagin'>
        <Paginate 
          pokemonPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
      />
      </div>
      <div className='container' >
        {
        pokemons[0]?  
        
        currentPokemons.map(pokemon => {
            return (
              pokemon.message? 

              (<Pokemon key={1} message={pokemon.message} /> )
              :
              (<section >
                <div className="pokemons">
                  <Link key={pokemon.id} to={'/home/' + pokemon.id} >
                    <Pokemon name={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} 
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
            <h2 className='title-load'>Loading...</h2>
            <img className='pokeball1' src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="" />
          </div>
        } 
        </div>
      </div>
    </div>
  )
 
}