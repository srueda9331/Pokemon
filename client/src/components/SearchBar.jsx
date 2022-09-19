import loading from '../image/Loading1.gif'
import pokemon from '../image/pokemon1.png'
import pikachu from '../image/pikachu1.png'
import '../styles/Home.css'
import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../actions";


export function SearchBar(){
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [name, setName ] = useState('')
  const [img, setImg ] =useState('')

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault()
    let d
    if(name){
      setMessage('')
      setImg('d')
      
      await dispatch(searchPokemon(name))
      // if(d.payload === 'Not found'){
      //   // alert('Sorry, this pokemon cannot be found')
      //   setMessage('Sorry, this pokemon cannot be found')
      // }
      
      setName('')    
      setMessage('')
      setImg('')

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
          img === 'd' && (
            <div onChange={handleInputChange}>
              {/* <span className='img-search'>Loading</span> */}
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
        <img style={{padding:'2px', marginLeft:'50px', position:'fixed', marginLeft:'1100px'}}src={pikachu} alt="pikachu" />

        </div>
        
    </div>
    
  )
 
}