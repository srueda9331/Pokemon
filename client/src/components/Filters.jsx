import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pokemonsInDb, orderByName, orderByAttack, findType} from '../actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Filters.css'


const Filters = ({setCurrentPage}) => {
  const [order, setOrder] = useState('');
  const allTypes = useSelector(state => state.types);
  const dispatch = useDispatch();


  function handleAllPokemons(e){
    dispatch(pokemonsInDb(e.target.value))
    setCurrentPage(1);
  }

  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }

  function handleAttack(e){
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
  }

  function findTypes(e){
    dispatch(findType(e.target.value))
   }
 

  function handleClick(e){
    e.preventDefault();
    window.location.reload()
  }

  return (
    <div className='filters'>
 
    <div >
      <p className='all-filter-titles'>ORDER BY:</p>
    <select className='selects' onClick={e => {handleSort(e)}} name="" id="" {...order}>
      <option value='asc'>In Alphabetic Order</option>
      <option value='des'>From Z to A Order</option> 
    </select>

    <select className='selects' style={{marginTop: '10px'}} onClick={e => {handleAttack(e)}} name="" id="">
      <option value='strong'>Stronger to Weaker</option>
      <option value='weak'>Weaker to Stronger</option>
    </select>

    </div>
    <p className='all-filter-titles' >FILTER BY SOURCE:</p>
    <select className='selects' onClick={e => {handleAllPokemons(e)}} name="" id="">
      <option value='all'>All my pokemons</option>
      <option value='created'>Created By Me</option>
      <option value='fromAPI'>From the API</option>
    </select>
    <p className='all-filter-titles' >FILTER BY TYPE:</p>
    <select className='selects' onClick={findTypes}>
      <option value='All'>All</option>
      {
        allTypes.map(el => <option value={el.name}>{el.name}</option>)
      }
    </select>
    <div >
      <Link to='/pokemon'>
       <button className='create-pokemon' to='/pokemon' >Create Pokemon!</button>
    </Link>
    </div>
    <div>
      <button className='show' onClick={(e) => handleClick(e)}>
        Start Again
      </button>
    </div>
  
    </div> 
  
  )
}

export default Filters;
