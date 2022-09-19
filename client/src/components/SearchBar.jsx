import '../styles/Home.css'
import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { searchPokemon, getPokemons } from "../actions";


export function SearchBar(){
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [name, setName ] = useState('')
  const [img, setImg ] =useState('')

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
  }

  async function handleSubmit(e){
    e.preventDefault()
    let d
    if(name){
      setMessage('')
      setImg('d')
      
      d = await dispatch(searchPokemon(name))
      if(d.payload === 'Not found'){
        alert('Sorry, this pokemon cannot be found')
        setName('')
      }
      
      setName('')    
      setMessage('')
      setImg('')

    } if(!name){
      alert('Write a name please') 
      setName('') 
    }
  
  }

  return (
    <div className='contain'>
      {/* <div> */}
        
      {/* </div> */}
      <div className='nav-bar'>
      
        <input className='bar' type='text' onChange={(e) => handleInputChange(e)} placeholder='Search by name only' />
        <button className='bar-button' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        {
      message.length > 0 && (
        <div >
          <p className="searchBar1">{message}</p>
        </div>
      )
    }
    {
      img === 'd' && (
        <div onChange={handleInputChange}>
          <p className='img-search'>Loading...</p>
        </div> 
      )
    }   
        </div>
        
    </div>
    
      
    
    
   
    
  )
 
}