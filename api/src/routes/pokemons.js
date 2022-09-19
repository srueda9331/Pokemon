const { Router } = require('express');
const { Pokemon, Types } = require('../db');
const { Op, where } = require('sequelize')

const axios = require('axios');
const router = Router();


const getAllPokemons = async () => {
  try {
    let pokemonApi;
    let allApiPokemons = [];

    for (let i = 1; i <= 16; i++) {
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
      // console.log(allApiPokemons);
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

const getPokemonApi = async (param) => {
  let searchAll = await axios.get('https://pokeapi.co/api/v2/pokemon/' + param)
  let pokeApi =   {
    id: searchAll.data.id,
    name: searchAll.data.name,
    img: searchAll.data.sprites.other.dream_world.front_default,
    attack: searchAll.data.stats[1].base_stat,
    typeOne: searchAll.data.types[0].type.name,
    typeTwo: searchAll.data.types[1]?.type.name

  }

  return pokeApi;
}

router.get('/', async (req, res) => {

  const name = req.query.name
  let allPokemons = await getAllPokemons();
  if(name){
    try {
      
        let oneFromApiPokemons = await getPokemonApi(name.toLowerCase())
        if(oneFromApiPokemons) res.status(200).send(oneFromApiPokemons)
        else{
          let findInDb = await Pokemon.findOne({ where : {name: name.toLocaleLowerCase()}})
          if(findInDb) return res.status(200).send(findInDb)
        }
        // let filteredPokemon = await allPokemons.filter(p => p.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        // if(filteredPokemon.length > 0) res.status(200).send(filteredPokemon)
        // else res.status(201).send('Not found')
      
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
    res.status(404).send(error)
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
          weight: pokemonById.data.weight
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