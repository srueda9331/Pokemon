import '../styles/Paginate.css'
import React from "react";

export default function Paginate({pokemonPerPage, pokemons, paginate}){
  const pageNumber = []; // [1,2,3,4]

  for (let i = 0; i < Math.ceil(pokemons/pokemonPerPage); i++) {
    pageNumber.push(i + 1) 
  }

  return (
    <nav>
      <ul className="paginated">
        {
          pageNumber?.map((number) => 
            (
                 <button className='number' onClick={() => paginate(number)}>{number + ' ' }</button>
            )
          )
        }
      </ul>
    </nav>
  )
}