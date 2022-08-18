import '../styles/home.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, pokemonsInDb, orderByName, orderByAttack, getAllTypes, findType } from "../actions";
import { Link } from "react-router-dom";
import Pokemon from "./pokemon";
import Paginate from "./paginate";
import { SearchBar } from "./searchBar";


export default function Home(){
  const pokemons = useSelector(state => state.pokemons)
  const pokemonsTypes = pokemons.map(el => el.typeOne)
  const allTypes = useSelector(state => state.types)
  console.log(pokemons.status  + '   primero');
  const [currentPage, setCurrentPage ] = useState(1)
  const [pokemonsPerPage, setPokemonP] = useState(12)
  const [state, ...setState] =useState('')
  const [order, setOrder] = useState('')
  const idxofLastPokemon = currentPage * pokemonsPerPage
  const idxofFirstPokemon = idxofLastPokemon - pokemonsPerPage  
  const currentPokemons = pokemons.slice(idxofFirstPokemon, idxofLastPokemon)
  console.log(allTypes);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllTypes())
  }, [dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons())
  }

  function handleAllPokemons(e){
    dispatch(pokemonsInDb(e.target.value))
    // if(e.target.value === 'created' && currentPokemons.length !== 0){
    //   alert("If you have created at least one it will appear, but if it isn't the page will show the original ones")
    //   dispatch(getPokemons())
    // } 
  }


  function handleSort(e){
    e.preventDefault();
    console.log(e.target.value);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }

  function findTypes(e){
   if(pokemonsTypes.length === 0){
    dispatch(getPokemons())
    alert('No');
    
   }
   dispatch(findType(e.target.value))
  }

  function handleAttack(e){
    e.preventDefault();
    
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }
  console.log(pokemons);

  return (
    
    <div className='home'>
        <SearchBar />
        <br />
      <div className='filters'>
        <div className='alp-strong'>
          <p>ORDER BY:</p>
        <select className='h' onClick={e => {handleSort(e)}} name="" id="">
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A Order</option>
        
        </select>
        <select onClick={e => {handleAttack(e)}} name="" id="">
          <option value='strong'>Stronger to Weaker</option>
          <option value='weak'>Weaker to Stronger</option>
          <option value='all'>Set initial state</option>
        </select>
        </div>
        <p className='all-byMe' >FILTER BY:</p>
        <select  onClick={e => {handleAllPokemons(e)}} name="" id="">
          <option value='all'>All my pokemons</option>
          <option value='created'>Created By Me</option>
          <option value='fromAPI'>From the API</option>
  
        </select>
        <select className='All' onClick={findTypes}>
          <option value='All'>All</option>
        {
          allTypes.map(el => <option value={el.name}>{el.name}</option>)
        }
      
          </select>
        <div className='create-show'>
          <Link to='/pokemon' className='create-link'>
           <button className='creat' to='/pokemon' >Create pokemon</button>
        </Link>
        </div>
        <div>
          <button className='show' onClick={(e) => handleClick(e)}>
            Show Me All!
          </button>
        </div>
        </div> 
       


      <div>
       <div>
        <div className='pagin'>
         <Paginate 
          pokemonPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginate={paginate}
        />
        </div>

        {currentPokemons.length < 1?  
        
        <div className='content'>
          <h2 className='title-load'>Loading...</h2>
        <img className='pokeball1' src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="" />
      
        </div>
        :
        
        currentPokemons.map(pokemon => {
            return (
              <div className='container'>
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
          </div>              
            )
            
          })
        }
        </div>
      </div>
    </div>
  )
 
}