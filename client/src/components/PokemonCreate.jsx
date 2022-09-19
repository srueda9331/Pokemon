import '../styles/PokemonCreate.css'
import pokeball1 from '../image/pokeball1.png';
import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypesNames, getPokemons } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert'


export function PokemonCreate(){
  const dispatch = useDispatch();
  const history = useHistory()
  const types = useSelector((state) => state.types);
  const pokemonExist = useSelector(state => state.pokemons.map(p => p.name));
  console.log(pokemonExist);
  const [errors, setErrors ] = useState({})  // {true}
 
  function validate(input){
    let errors = {};
  
    if(!input.name){
      errors.name = 'A name is required'
    } else if(!/[a-z]+$/.test(input.name)){
      errors.name = 'It must be only text in minuscules and only first name';
    } else if(pokemonExist.includes(input.name.toLowerCase())){
      errors.name = `There's already a pokemon with that name`;
    }   else if(input.name.length < 3){
      errors.name = "It's too short for a name, at least 3 letters";
    } else if(input.name.length > 18 ){
      errors.name = 'The name should not surpass 18 letters';
    }
    if(!input.image){
      errors.image = 'Image is required'
    }
    else if(!/(http(s?):)([/|.|\w|\s|-])*\.(jpg|gif|png|jpeg)$/.test(input.image)) {
      errors.image = 'The URL is invalid, it must be the type of png, jpeg, jpg, gif'
    }
  
    if(!input.hp){
      errors.hp = 'It must have a life points number'
    }
    if(!input.attack){
      errors.attack = 'It must must have a attack number'
    }
    if(!input.defense){
      errors.defense = 'It must must have a defense number'
    }
    if(input.typeOne === input.typeTwo){
      errors.typeOne = 'You cannot repeat type values'
    }
    if(!input.speed){
      errors.speed = 'It must must have a speed number'
    } else if(input.speed > 400){
      errors.speed = "The height shouldn't be more than 400 dm/s"
    }
    if(!input.height){
      errors.height = 'It must must have a height number'
    } else if(input.height > 1500){
      errors.height = "The height shouldn't be more than 1500 cms"
    }
    if(!input.weight){
      errors.weight = 'It must must have a weight number'
    }  else if(input.weight > 9800){
      errors.height = "The weight shouldn't be more than 9800 Kg"
    }
   
    return errors;
  }

  const [input, setInput ] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    types: [],
    typeOne: 'normal',
    typeTwo: null,
    speed: '',
    height: '',
    weight: ''
  })


  useEffect(() => {
    dispatch(getTypesNames());
    dispatch(getPokemons());
  }, [dispatch]);

  function handleInput(e){
    
    setInput({
      ...input,
      [e.target.name] : e.target.value,
      
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
    
  
    
    console.log(input + ' llega');
    
  }

 

  function handleDelete(el){
    setInput({
      ...input,
      types: input.types.filter(t => t !== el)
    })
  } 

  function handleSubmit(e){
        e.preventDefault(e);
        setErrors(validate(input))
        if(errors.name || errors.image || errors.hp || errors.weight || errors.height || errors.attack || errors.defense || errors.typeOne) {
          swal({
            title:'Try again',
            text:'There are some invalid values yet',
            icon: 'error',
            timer: '3500' 
          })
          e.preventDefault()
          setErrors('')
         
        } else if(!input.name || !input.hp || !input.attack || !input.weight || !input.height || !input.speed ){
          swal({
            title:'Try again',
            text:'There are still fields missing to complete',
            icon: 'error',
            timer: '3500' 
          })
          e.preventDefault()
          setErrors('')
          
        }
          else {
          dispatch(createPokemon(input))
          swal({
            title:'Pokemon created!',
            text:'Your pokemon will soon appear in the pokemon list, be patient',
            icon: 'success',
            timer: '3500' 
          })
          history.push('/home')
          
        }
        setInput({
          speed: '10',
          typeOne: 'normal',
          typeTwo: null
        })
       
      
  }



  return (
    <div className='create'>
    
      <Link to='/home'><button className='back1'>Get back</button></Link>
      <h1 className='title-create'>Create your own Pokemon!</h1>
                <div className='errors1'>
               
              
              
                </div>
                <div className='errors2'>
                
                
              
                 {
                  errors?.typeOne? (<p className='error'>{errors?.typeOne}</p>) : false
                }
                </div>
      <div className='form'>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
      <p className='descript-create'>Fill the following fields please</p>

        <div className='block1'>
        <div className='name-img'>
          <div className='name-form'>
            <label htmlFor="" style={{marginLeft:'-100px'}} className='margin-text1'>Name: </label>
            <input type='text' value={input?.name} name='name' onChange={handleInput} />
            {
              errors.name? (<p className='error1'>{errors.name }</p>) : (false)
            }
          </div>
          <div>
            <label htmlFor="" style={{marginLeft:'-100px'}} className='margin-text1'>Image: </label>
            <input type='text' value={input?.image} name='image' onChange={handleInput} />
            {
              errors.image? (<p style={{marginLeft:'-100px'}} className='error1'>{errors?.image }</p>) : false
            }

          </div>
        </div>
        <div className='range'>
          <div >
            <label htmlFor="" style={{marginLeft: '20px'}} className='margin-text'>Life:</label>
            <input type='range' style={{color: 'white'}} value={Math.min(input?.hp) } name='hp' onChange={handleInput} min='1' max='150' step='1' className='inputs' />
            <output style={{color: 'white', fontWeight: 'bold'}}>{input?.hp}</output>
            {
              errors.hp?  (<p className='error'>{errors?.hp || ""}</p>) : false
            }
          </div>
          <div>
            <label htmlFor="" style={{marginLeft: '-2px'}} className='margin-text'>Attack:</label>
            <input type='range' value={Math.min(input?.attack)} name='attack' onChange={handleInput} min='1' max='130' step='1' className='inputs' />
            <output style={{color: 'white', fontWeight: 'bold'}}>{input?.attack}</output>
            {
              errors.attack? (<p className='error'>{errors?.attack }</p>) : false
            }
          </div>
          <div>
            <label htmlFor="" style={{marginLeft: '-15px'}} className='margin-text'>Defense:</label>
            <input type='range' value={Math.min(input?.defense)} name='defense' onChange={handleInput} min='1' max='130' step='1' className='inputs'/>
            <output style={{color: 'white', fontWeight: 'bold'}}>{input?.defense}</output>
            {
              errors.defense? (<p className='error'>{errors?.defense}</p>) : false
            }
          </div>
          <div>
            <label htmlFor="" style={{marginLeft: '-1px'}} className='margin-text'>Speed:</label>
            <input type='range' value={Math.min(input?.speed)} name='speed' onChange={handleInput} min='10' max='100' step='1' className='inputs'/>
            <output style={{color: 'white', fontWeight: 'bold'}}>{input?.speed}</output>
           
          </div>
        </div>
        </div>
        <div className='block2'>
        <div className='selects-type'>
          <div className='select1'>
            <label htmlFor="" className='margin-text'>TypeOne:</label>
            <select onChange={handleInput} onClick={handleDelete} value={input.typeOne} name="typeOne" className='inputs'>
                {
                  types?.map((t ) => {
                    return (<option value={t.name}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>)
                    
                  })
                }
            </select>
            {
              errors.speed? (<p style={{marginLeft:'-20px'}} className='error1'>{errors?.speed }</p>) : false
            }
          </div>
          <div>
            <label htmlFor="" className='margin-text'>TypeTwo:</label>
            <select onChange={handleInput} onClick={handleDelete} value={input.typeTwo} name="typeTwo" className='inputs' >
                {
                  types?.map((t) => {
                    return <option value={t.name} >{t.name[0].toUpperCase() + t.name.slice(1)}</option>
                  })
                }
            </select>
          </div>
        </div>
        <div className='w-h'>
          <div className='height-1'>
            <label htmlFor="" className='margin-text'>Height:</label>
            <input type='number' value={input?.height} name='height' onChange={handleInput} className='inputs'/>    
            {
              errors?.height? (<p className='error'>{errors?.height}</p>) : false
            }
         
          </div>
          <div>
            <label htmlFor="" className='margin-text'>Weight:</label>
            <input type='number' value={input?.weight} name='weight' onChange={handleInput} className='inputs'/>
            {
              errors?.weight? (<p className='error'>{errors?.weight}</p>) : false
            }
          </div>
        </div>
        </div>
        <br />
        <img src={pokeball1} style={{width: '70px', cursor: 'pointer'}} onClick={handleSubmit} alt='pokeball' />
      </form>
    </div>
  </div>
  )
}