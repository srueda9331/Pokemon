import loading from '../image/Loading1.gif'
import pokemon from '../image/pokemon1.png'
import pikachu from '../image/pikachu1.png'
import '../styles/Home.css'
import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../actions";


export function SearchBar({currentPage, setCurrentPage}){
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [name, setName ] = useState('')
  const [load, setLoad ] =useState('')

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(name){
      setMessage('')
      setLoad('d')
      await dispatch(searchPokemon(name))
      setName('')    
      setMessage('')
      setLoad('')
      setCurrentPage(1)
    } if(!name){
      setMessage('Write a name please') 
      setName('') 
    }
  
  }

  return (
    <div>
   
      <div className='nav-bar'>
      <div>
        <img style={{height:'77px', width:'184px', padding:'10px', marginLeft:'50px'}}src={pokemon} alt="brand" />
      </div>
        <input className='bar' type='text' onChange={(e) => handleInputChange(e)} placeholder='Search by name only' />
        <button className='bar-button' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        {
          load === 'd' && (
            <div onChange={handleInputChange}>
              <span><img style={{width: '64px', marginLeft:'7px', marginTop:'45px'}} alt='load-gif' src={loading} /></span>
            </div> 
          )
        }   
        {
          message.length > 0 && (
            <div>
              <span className="no-name">{message}</span>
            </div>
          )
        }
        <img style={{padding:'2px', position:'fixed', marginLeft:'1100px'}}src={pikachu} alt="pikachu" />

        </div>
        
    </div>
    
  )
 
}