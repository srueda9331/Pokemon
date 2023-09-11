import axios from 'axios';

// ACTION TYPES:
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const POKEMONS_IN_DB = 'POKEMONS_IN_DB';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const ORDER_BY_ID = 'ORDER_BY_ID';
export const TYPES_ALL = 'TYPES_ALL'



// export function getPokemons(){
//   return async function(dispatch){
//     let pokemon = await axios.get('http://localhost:3001/pokemons/')
//     return dispatch({
//       type : GET_POKEMONS,
//       payload: pokemon.data
//     })
    
//   } 

// }

export function getPokemons(){
  return function(dispatch){
    axios.get(`/pokemons/`)
    .then((pokemons) => { 
      dispatch({
        type: GET_POKEMONS, 
        payload: pokemons,
        
      })
    })
    .catch((error) => console.log(error))
  }
}

export function searchPokemon(name){

  return async function(dispatch){
    try {
      let findPokemon = await axios.get(`/pokemons?name=` + name);
      return dispatch({
        type: SEARCH_POKEMON, 
        payload: findPokemon.data
      })
      
    } catch (error) {
      console.log(error);
      return dispatch({
        type: SEARCH_POKEMON, 
        payload: {message: "Sorry, there's no any pokemon with that name"}
      })
    }
  }
}



export function getTypesNames(){
  return function(dispatch){
    axios.get(`/types/`)
    .then((types) => { 
      dispatch({
        type: GET_TYPES, 
        payload: types.data
        
      })
    })
    .catch((error) => console.log(error))
  }
}

export function createPokemon(payload){
  console.log(payload.name + 'create');
  return async function(dispatch){
    let createPok = await axios.post(`/pokemons/`, payload);
    console.log(createPok);
    return createPok;
  }
}

export function getPokemonDetail(id){
  return async function(dispatch){
    try {
      let pokemonDetail = await axios.get(`/pokemons/` + id);
      console.log(pokemonDetail);
      return dispatch({
        type: GET_POKEMON_DETAIL,
        payload: pokemonDetail.data
      })
      
    } catch (error) {
      console.log(error);
      
    }
  }
}



export function pokemonsInDb(payload){
  return {
    type: POKEMONS_IN_DB,
    payload
  }
}

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByAttack(payload){
  return {
    type: ORDER_BY_ATTACK,
    payload
  }
}

export function cleanDetail(payload){
  return {
    type: CLEAN_DETAIL,
    payload: {},
  }
}

export function orderById(payload){
  return {
    type: ORDER_BY_ID,
    payload
  }
}


export function getAllTypes(){
  return async function(dispatch){
    try {
      const typesAll = await axios.get(`/types`)
      return dispatch({
        type: GET_TYPES,
        payload: typesAll.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function findType(payload){
  return {
    type: TYPES_ALL,
    payload
  }
}