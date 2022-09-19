const { Router } = require('express');
const { Pokemon, Types } = require('../db');
const { Op } = require('sequelize')

const axios = require('axios');
const router = Router();


const getAllPokemons = async () => {
  try {
    let pokemonApi;
    let allApiPokemons = [];

    for (let i = 1; i <= 41; i++) {
      pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
      let eachPokemon = {
        id: pokemonApi.data.id,
        name: pokemonApi.data.name,
        img: pokemonApi.data.sprites.other.dream_world.front_default,
        attack: pokemonApi.data.stats[1].base_stat,
        typeOne: pokemonApi.data.types[0].type.name,
        typeTwo: pokemonApi.data.types[1]?.type.name,
        // types: pokemonApi.data.types.map(el => el.type.name),
      }
      allApiPokemons.push(eachPokemon)
    }
    let pokemonsDb = await Pokemon.findAll({ include : Types})
    let allPokemonsDb = pokemonsDb.map(pokemon => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        createdInDB : pokemon.createdInDb,
        typeOne: pokemon?.types[0]?.name,
        typeTwo: pokemon?.types[1]?.name,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,

      }
    })
    return [...allApiPokemons, ...allPokemonsDb];

  } catch (error) {
    console.log(error);
  }
}


const getOnePokemon = async (param) => {
  try {
  let searchInDb = await Pokemon.findOne({ where: {name : param.toLowerCase()}, include: Types})
  if(searchInDb){
    let pokeInDb =   {
      id: searchInDb.id,
      name: searchInDb.name,
      img: searchInDb.image,
      attack: searchInDb.attack,
      typeOne: searchInDb?.types[0]?.name,
      typeTwo: searchInDb?.types[1]?.name,

    }
  return pokeInDb
  }
  let searchOneFromAPI = await axios.get('https://pokeapi.co/api/v2/pokemon/' + param.toLowerCase())
  if(searchOneFromAPI){
    let pokeApi =   {
      id: searchOneFromAPI.data.id,
      name: searchOneFromAPI.data.name,
      img: searchOneFromAPI.data.sprites.other.dream_world.front_default,
      attack: searchOneFromAPI.data.stats[1].base_stat,
      typeOne: searchOneFromAPI.data.types[0].type.name,
      typeTwo: searchOneFromAPI.data.types[1]?.type.name
  
    }
    return pokeApi
  }
  } catch (error) {
    res.status(404).send('Pokemon not found')
  }

}

router.get('/', async (req, res) => {

  const name = req.query.name
  let allPokemons = await getAllPokemons();
 
  if(name){
    try {
      let pokemonFound = await getOnePokemon(name.toLowerCase())
      if(pokemonFound) res.status(200).send(pokemonFound)
      
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  } else {
      res.status(200).send(allPokemons)
  }
});



router.post('/', async (req, res) => {
  console.log('hola');
  const { name, image, hp, attack, defense, speed, typeOne, typeTwo , createdInDb, height, weight } = req.body

  try {
  if(!name) {throw new TypeError({msg: 'No name'})}
  let atLeatOne = await Pokemon.findOne({ where : {name: name.toLocaleLowerCase()}})
  if(atLeatOne) {throw new Error('The pokemon with that name already exists')}
  // if(!image && !hp && !attack && !defense && !height && !weight) res.status(400).send('There are missing fields')

    let newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      createdInDb,
      height,
      weight
    })
    console.log('nuevo', newPokemon.__proto__);
    let typeDB = await Types.findAll({
     attributes: ['id'], where: { name: {[Op.in] : [typeOne, typeTwo]}}

    })
    
    await newPokemon.addTypes(typeDB)
    res.send('Pokemon created successfully');
  } catch (error) {
    res.status(404).json({msg: 'There are missing fields'})
  }
})



router.get('/:id', async (req, res) => {
  const { id } = req.params
  if(!id) throw new Error('id is required')
  let pokemonById;
  let foundPokemon;

  if(typeof id === 'string' && id.length > 15){
    pokemonById = await Pokemon.findByPk(id, {include: Types}, {where : ['name']})
    if(pokemonById) res.send(pokemonById)
    
  } else{

    try {

      pokemonById = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

      foundPokemon =  {
          id: pokemonById.data.id,
          name: pokemonById.data.name,
          img: pokemonById.data.sprites.other.dream_world.front_default,
          hp: pokemonById.data.stats[0].base_stat,
          attack: pokemonById.data.stats[1].base_stat,
          defense: pokemonById.data.stats[2].base_stat,
          speed: pokemonById.data.stats[5].base_stat,
          typeOne: pokemonById.data.types[0].type.name,
          typeTwo: pokemonById.data.types[1]?.type.name,
          height: pokemonById.data.height,
          weight: pokemonById.data.weight,
          createdInDb: pokemonById?.createdInDb
        }

     if(foundPokemon) res.send(foundPokemon)
   
    } catch (error) {
      res.status(404).json({error: 'Not found'});
    }
  }
})


// {
//   "name" : "pali",
//   "image" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/40.svg",
//   "hp": 24,
//   "attack": 32,
//   "defense": 12,
//   "speed": 15,
//   "typeOne": "poison",
//   "typeTwo": "grass",
//   "createdInDb": true,
//   "height": 5,
//   "weight": 3
// }






module.exports = router;