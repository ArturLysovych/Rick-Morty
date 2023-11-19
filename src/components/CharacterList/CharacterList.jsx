import React, { useState, useEffect } from 'react';
import './css/CharacterList.css';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../redux/slices/CharacterSlice';
import { fetchCharacters } from '../../redux/services/api';
import { Pagination } from '@mui/material';

export default function CharacterList() {
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const characters = useSelector((state) => state.characters.list);
    const charactersPage = useSelector((state) => state.characters.page);
    const dispatch = useDispatch(); 

    useEffect(() => {
      dispatch(fetchCharacters(charactersPage));
    }, [dispatch, charactersPage]);

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
        dispatch(fetchCharacters(newPage));
    };    
    
    const showPopup = (character) => {
      setCurrentCharacter(character);
      setPopupVisible(true);
    };

    const hidePopup = () => {
      setPopupVisible(false);
    };

    return (
      <div className="CharacterList">
        <div className="popup" style={{ display: popupVisible ? 'flex' : 'none' }}>
          <img src={currentCharacter.image} alt={currentCharacter.id} />
          <h2>{currentCharacter.name}</h2>
          <button onClick={hidePopup}>hide</button>
        </div>
        <h1>Ricky Morty Characters</h1>
        <ul>
        {characters.map((character) => (
        <div key={character.id} onClick={() => showPopup(character)}>
          <div className="img-wrapper">
            <img src={character.image} alt={character.id} />
          </div>
          <div>
            <h2>{character.name}</h2>
          </div>
        </div>
        ))}
        </ul>
        <div className='paginationContainer'>
            <Pagination
                count={42}  // Кількість сторінок
                page={charactersPage}  // Поточна сторінка
                color="primary"
                onChange={(event, newPage) => {
                  handlePageChange(newPage); // Use newPage instead of page
                }}
            />
          </div>
      </div>
    );
}
