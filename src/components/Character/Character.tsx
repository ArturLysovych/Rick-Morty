import React from 'react';

import { ICharacterProps } from './interfaces';

const Character: React.FC<ICharacterProps> = ({ character, showPopup }) => {
  
  const handleClick = () => {
    showPopup(character);
  };

  return (
    <div className='card' key={character.id} onClick={handleClick}>
      <div className="img-wrapper">
        <img src={character.image} alt={character.name} />
      </div>
      <div className='card-bottom'>
        <p>{character.name}</p>
      </div>
    </div>
  );
};

export default Character;
