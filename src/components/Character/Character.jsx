import React from 'react'

export default function Character(props) {
    const { character, showPopup } = props;
    
    return (
        <div className='card' key={character.id} onClick={() => {showPopup(character); console.log(character)}}>
          <div className="img-wrapper">
            <img src={character.image} alt={character.id} />
          </div>
          <div className='card-bottom'>
            <p>{character.name}</p>
          </div>
        </div>  
    )
}
