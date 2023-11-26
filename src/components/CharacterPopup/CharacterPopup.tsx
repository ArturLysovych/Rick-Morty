import React from 'react';

interface CharacterPopupProps {
  popupVisible: boolean;
  hidePopup: () => void;
  currentCharacter: {
    id: number;
    name: string;
    gender: string;
    species: string;
    location?: { name: string };
    status: string;
    type?: string;
    image: string;
  };
}

const CharacterPopup: React.FC<CharacterPopupProps> = ( props ) => {
    const { popupVisible, hidePopup, currentCharacter } = props;

    return (
        <div className="popup" style={{ transform: popupVisible ? 'scale(1)' : 'scale(0)' }} onClick={hidePopup}>
          <div className="inner">
            <div className="img-wrapper">
              <img src={currentCharacter.image} alt={currentCharacter.name} />
            </div>
            <ul>
              <h2>{currentCharacter.name}</h2>
              <li>Gender - <span>{currentCharacter.gender}</span></li>
              <li>Species - <span>{currentCharacter.species}</span></li>
              <li>Location - <span>{currentCharacter.location && currentCharacter.location.name}</span></li>
              <li>Status - <span>{currentCharacter.status}</span></li>
              <li>Type - <span>{currentCharacter.type}</span></li>
            </ul>
          </div>
        </div>
    );
}

export default CharacterPopup;
