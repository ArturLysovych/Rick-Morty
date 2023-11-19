import React from 'react'

export default function Character(props) {
    const { character, showPopup } = props;
    
    return (
        <div key={character.id} onClick={() => {showPopup(character)}}>
          <div className="img-wrapper">
            <img src={character.image} alt={character.id} />
          </div>
          <div>
            <h2>{character.name}</h2>
          </div>
        </div>  
    )
}
