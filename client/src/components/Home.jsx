import '../styles/Home.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypesNames } from "../actions";
import Paginate from "./Paginate";
import { NavBar } from "./NavBar";
import Pokemons from './Pokemons';
import Filters from './Filters';


export default function Home(){

  const pokemons = useSelector(state => state.pokemons);
  const [currentPage, setCurrentPage ] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const idxofLastPokemon = currentPage * pokemonsPerPage;
  const idxofFirstPokemon = idxofLastPokemon - pokemonsPerPage; 
  const currentPokemons = pokemons.slice(idxofFirstPokemon, idxofLastPokemon);
  const dispatch = useDispatch();
  window.scroll(0,0);



  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypesNames());

  }, [dispatch])

  return (
    
    <main className='home'>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <Filters setCurrentPage={setCurrentPage}/>
      <section style={{paddingTop: '140px'}}>
      <Paginate 
        pokemonPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
       <Pokemons 
        pokemons={pokemons} 
        currentPokemons={currentPokemons}
      />
      </section>

    </main>
  )
 
}