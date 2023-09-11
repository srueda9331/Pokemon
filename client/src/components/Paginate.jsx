import '../styles/Paginate.css'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import React from "react";

export default function Paginate({pokemonPerPage, pokemons, paginate, currentPage, setCurrentPage }){
  const pageNumber = []; // [1,2,3,4]
  for (let i = 0; i < Math.ceil(pokemons/pokemonPerPage); i++) {
    pageNumber.push(i + 1) 
  }

  return (
    <nav>
      <ul className="paginated">
        <button 
          onClick={() => setCurrentPage(currentPage === 1? currentPage : currentPage - 1)} 
          className={`${pokemons === 0? 'left' : 'prev-next' }`}>
            <BiChevronLeft className={`${pokemons === 0? 'left' : '' }`} />
        </button>
        {
          pageNumber?.map((number, index) => 
            (
              <button 
                id={index}
                className='number' onClick={() => paginate(number)}>
                  {number }
              </button>
            )
          )
        }
        <button 
          className={`${pokemons === 0? 'right' : 'prev-next' }`} 
          onClick={() => setCurrentPage(currentPage === Math.ceil(pokemons/pokemonPerPage)? currentPage : currentPage + 1)} >
            <BiChevronRight />
        </button>

      </ul>
    </nav>
  )
}