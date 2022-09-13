const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Types } = require('../db')



const router = Router();


router.get('/', async (req, res) => {
  try {
    
    let typeApi = await axios.get(`https://pokeapi.co/api/v2/type`)
    let getTypes = typeApi.data.results.map((t) => t.name)
    getTypes.forEach(element => {
      Types.findOrCreate({
        where: {name: element}
      })
    });
    let TypesDb = await Types.findAll()
    res.send(TypesDb);
    
  } catch (error) {
    console.log(error);
  }
    
   
})


    
// router.get('/',  (req, res) => {
 
//  try {
//    axios.get(`https://pokeapi.co/api/v2/type`)
//    .then(response => {
//      let types = response.data.results.map((el, i = 0) => {
//       var id = i + 1;
//       let obj = {
//         id: id++,
//         name: el.name
//       }
//        return obj
//      })
//      Types.bulkCreate(types)
//      res.json({msg: 'sent'})
//    });
  
//  } catch (error) {
//   console.log(error);
//  }

// })
    
    
    
    
  
  




module.exports = router;