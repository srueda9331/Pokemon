import { GET_POKEMONS, 
  ORDER_BY_NAME,
  POKEMONS_IN_DB, 
  SEARCH_POKEMON, 
  GET_TYPES, 
  GET_POKEMON_DETAIL,
  CLEAN_DETAIL, 
  ORDER_BY_ATTACK,
  ORDER_BY_ID,
  TYPES_ALL          } from "../actions";

const initialState = {
pokemons: [],
pokemonsAgain : [],
types: [],
detail: {},
filtered: []

}

function reducer(state = initialState, action){

switch(action.type){

case GET_POKEMONS: 
 return {
   ...state,
   pokemons: action.payload.data,
   pokemonsAgain : action.payload.data
 }

case SEARCH_POKEMON: 
 return {
   ...state,
   // pokemons: action.payload === 'Not found'?  state.pokemonsAgain  : action.payload
   pokemons: [action.payload]
 }
case GET_TYPES:
 return {
   ...state,
   types: action.payload
 }

case POKEMONS_IN_DB:
 // const pokemonCreated = action.payload === 'created'? state.pokemonsAgain.filter(p => typeof p.id === 'string' || p.createdInDB) : state.pokemonsAgain.filter(p => typeof p.id !=='string' || !p.createdInDB)
 // return {
 //   ...state,
 //   pokemons: action.payload === 'all'? state.pokemonsAgain : pokemonCreated
 // }
 const pokemonsAll = state.pokemonsAgain;
 const pokemonCreated = action.payload === 'created' ? 

   pokemonsAll.filter(p => typeof p.id === 'string' || p.createdInDB) 
   : 
   action.payload === 'fromAPI'?
   pokemonsAll.filter(p => typeof p.id !=='string' || !p.createdInDB) 
   :
   pokemonsAll
 return {
   ...state,
   pokemons: pokemonCreated[0]? pokemonCreated : [{message: 'These pokemons will appear until you decide to create at least one'}],
   filtered: pokemonCreated
 }

case GET_POKEMON_DETAIL:
 return {
   ...state,
   detail: action.payload
 }
case CLEAN_DETAIL:
 return {
   ...state,
   detail: action.payload
 }
case ORDER_BY_NAME:
 
 
 let sortArray = action.payload === 'asc'?
 state.pokemons.sort((a,b) => {
   if(a.name > b.name){
     return 1;
   }
   if(b.name > a.name){
     return -1;
   }
   return 0;
 }) : 
 state.pokemons.sort((a, b) => {
   if(a.name > b.name){
     return -1;
   }
   if(b.name > a.name){
     return 1;
   }
   return 0;
 })
 return {
   ...state,
   pokemons: action.payload ==='all'? state.pokemonsAgain : [...sortArray] 
 }

case ORDER_BY_ATTACK:
 let sortAttack = action.payload === 'strong'?
 state.pokemons.sort((a,b) => b.attack - a.attack) 
 : 
 state.pokemons.sort((a,b) => a.attack - b.attack) 
 return {
   ...state,
   pokemons: [...sortAttack] 
 }
case ORDER_BY_ID:
 
 state.pokemons.sort((a,b) => {
   if(a.id > b.id){
     return 1;
   }

   return 0;
 })  
 
 return {
   ...state,
   pokemons: action.payload 
 }
 case TYPES_ALL:
   const filteredOnes = state.filtered[0]? state.filtered : state.pokemonsAgain;
   const filteredType = action.payload === 'All' && filteredOnes[0]?
     filteredOnes
     :
     filteredOnes.filter(p => p.typeOne === action.payload || p.typeTwo === action.payload)
   return {
     ...state,
     pokemons: filteredType[0]? filteredType : [{message: 'Sorry, but that pokemon type is not currently available'}]
   }

default:
 return state
}
}

export default reducer;