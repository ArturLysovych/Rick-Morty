import React from 'react';

import { ICharacterPopupProps } from './interfaces';

const CharacterPopup: React.FC<ICharacterPopupProps> = ( props ) => {
    const { popupVisible, hidePopup, currentCharacter } = props;

    return (
        <div className="popup" style={{ transform: popupVisible ? 'scale(1)' : 'scale(0)' }} onClick={hidePopup}>
          <div className="inner">
            <div className="img-wrapper">
              <img src={currentCharacter.image} alt={currentCharacter.name} />
            </div>
            <ul>
              <h2>{currentCharacter.name}</h2>
              <li><div className='circle'></div>Gender - <span>{currentCharacter.gender}</span></li>
              <li><div className='circle'></div>Species - <span>{currentCharacter.species}</span></li>
              <li><div className='circle'></div>Location - <span>{currentCharacter.location && currentCharacter.location.name}</span></li>
              <li><div className='circle'></div>Status - <span>{currentCharacter.status}</span></li>
              <li><div className='circle'></div>Type - <span>{currentCharacter.type}</span></li>
            </ul>
          </div>
        </div>
    );
}

export default CharacterPopup;
