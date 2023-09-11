import loading from '../image/Loading1.gif'
import pokemon from '../image/pokemon1.png'
import pikachu from '../image/pikachu1.png'
import '../styles/Navbar.css'
import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../actions";

export function NavBar({currentPage, setCurrentPage}){
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [name, setName ] = useState('')
  const [load, setLoad ] =useState('')

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  }

console.log(load);
console.log(name);

  async function handleKeyPress(e){
    if(e.keyCode === 13 && name.length > 0 && /[a-zA-Z]+$/.test(name)){
      setMessage('')
      setLoad('sent')
      await dispatch(searchPokemon(name))
      setName('')    
      setMessage('')
      setLoad('')
      setCurrentPage(1)
    } if(e.keyCode === 13 && (!name || /\W+$/.test(name))) {
      setMessage('Write a name please') 
      setName('') 
    }
  }

  async function handleSubmit(e){

    e.preventDefault();
    if(name && /[a-zA-Z]+$/.test(name)){
      setMessage('')
      setLoad('sent')
      // searchButton.setAttribute('disable-search-button')

      await dispatch(searchPokemon(name))
      
      setName('')    
      setMessage('')
      setLoad('')
      setCurrentPage(1)
    } if(!name || /\W+$/.test(name)){
      setMessage('Write a name please') 
      setName('') 
    }
  
  }

  return (
    <nav className='nav-bar'>
      <section className='nav-bar-children' >
        <div>
          <img style={{height:'77px', width:'184px', padding:'10px', marginLeft:'90px'}}src={pokemon} alt="brand" />
        </div>
        <div className='search-bar-elements'>
          <input 
            className='search-bar' 
            type='text' onChange={(e) => handleInputChange(e)} 
            onKeyDown={handleKeyPress} 
            placeholder='Search by name only' 
          />
          {
          load === 'sent'?
            <button id='button1' disabled={true} className='no-search' type='submit'>Search</button>
            :
            <button id='button' className='bar-button' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
          }
          {
            load === 'sent' && (
              <span onChange={handleInputChange}>
                <img style={{width: '64px', marginLeft:'7px', marginTop:'3px'}} alt='load-gif' src={loading} />
              </span>
            )
          }   
          {
            message.length > 0 && (
              <span className="no-name-written-message">
                {message}
              </span>
            )
          }
        </div>
         <div>
          <img 
            style={{padding:'2px', 
            marginRight:`${load === 'sent'? '90px' : message.length > 0? '90px' : '90px'}`}} src={pikachu} alt="pikachu" 
          />
         </div>

      </section>
    </nav>
    
  )
 
}