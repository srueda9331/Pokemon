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
  pokemonsNone: []
  
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
          pokemons: action.payload === 'Not found'?  state.pokemonsAgain  : action.payload
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
        const pokemonCreated = action.payload === 'created' ? pokemonsAll.filter(p => typeof p.id === 'string' || p.createdInDB) : pokemonsAll.filter(p => 	typeof p.id !=='string' || !p.createdInDB)
        return {
          ...state,
          pokemons: action.payload === 'all'? state.pokemonsAgain : pokemonCreated
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
          pokemons: action.payload ==='all'? state.pokemonsAgain : [...sortAttack] 
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
          const allPokemons = state.pokemonsAgain;
          const filteredPokemons = action.payload === 'All'?
            allPokemons
            :
            allPokemons.filter(p => p.typeOne === action.payload || p.typeTwo === action.payload)
          return {
            ...state,
            pokemons: filteredPokemons.length > 0? filteredPokemons : allPokemons
          }

      default:
        return state
    }
}

export default reducer;