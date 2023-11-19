import React, { useState, useEffect } from 'react';
import Character from '../Character/Character';
import EpisodesTable from '../EpisodesTable/EpisodesTable';
import LocationsTable from '../LocationsTable/LocationsTable';
import './css/CharacterList.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/services/api';
import { fetchEpisodes } from '../../redux/services/api';
import { fetchLocations } from '../../redux/services/api';
import { Pagination, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function CharacterList() {
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentInfo, setCurrentInfo] = useState('characters');
    const [infoArr, setInfoArr] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(42);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterName, setFilterName] = useState('');
    const characters = useSelector((state) => state.characters.list);
    const episodes = useSelector((state) => state.episodes.list);
    const locations = useSelector((state) => state.locations.list);
    const charactersPages = useSelector((state) => state.characters.limit);
    const episodesPages = useSelector((state) => state.episodes.limit);
    const locationsPages = useSelector((state) => state.locations.limit);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCharacters({ page, status: filterStatus, gender: filterGender, name: filterName }));
      dispatch(fetchLocations({ page }));
      dispatch(fetchEpisodes({ page }));
    }, [dispatch, page]);  

    useEffect(() => {
      dispatch(fetchCharacters({ page, status: filterStatus, gender: filterGender, name: filterName }));
    }, [dispatch, page, filterStatus, filterGender, filterName]);

    useEffect(() => {
      if(currentInfo==="characters") {
        setInfoArr(characters);
        setPageLimit(charactersPages);
      }
      if(currentInfo==="episodes") {
        setInfoArr(episodes);
        setPageLimit(episodesPages);
      }
      if(currentInfo==="locations") {
        setInfoArr(locations);
        setPageLimit(locationsPages);
      }

    }, [currentInfo, characters, episodes, locations]);      

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
  
    const showPopup = (character) => {
      setCurrentCharacter(character);
      setPopupVisible(true);
    };

    const hidePopup = () => {
      setPopupVisible(false);
    };

    const handleChangeStatus = (event) => {
      setFilterStatus(event.target.value);
    };
    const handleChangeGender = (event) => {
      setFilterGender(event.target.value);
    };

    return (
      <>
      <div className="CharacterList" style={popupVisible ? { filter: 'blur(10px)' } : { filter: 'blur(0)' }}>
        <h2>Rick Morty Info</h2>
          <ButtonGroup variant="outlined" aria-label="outlined button group" size='large'>
            <Button onClick={() => {setCurrentInfo("characters"); setPage(1);}}>Characters</Button>
            <Button onClick={() => {setCurrentInfo("episodes"); setPage(1);}}>Episodes</Button>
            <Button onClick={() => {setCurrentInfo("locations"); setPage(1);}}>Locations</Button>
          </ButtonGroup>
        {currentInfo === "characters" ? (
          <div className="filterContainer">
            <FormControl sx={{ m: 1, minWidth: 120, height: 50 }} size="small" className='selection'>
            <InputLabel id="demo-select-small-label">Status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filterStatus}
              label="Status"
              onChange={handleChangeStatus}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'alive'}>alive</MenuItem>
            <MenuItem value={'dead'}>dead</MenuItem>
            <MenuItem value={'unknown'}>unknown</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, height: 50 }} size="small" className='selection'>
              <InputLabel id="demo-select-small-label">Gender</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filterGender}
                label="Status"
                onChange={handleChangeGender}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'female'}>female</MenuItem>
              <MenuItem value={'male'}>male</MenuItem>
              <MenuItem value={'genderless'}>genderless</MenuItem>
              <MenuItem value={'unknown'}>unknown</MenuItem>
              </Select>
            </FormControl>
            <input type="text" className='nameInput' placeholder='Search character' onChange={(e) => {
              setFilterName(e.target.value)
            }}/>
          </div>
        ) : null}
        <ul>
        {currentInfo === "characters" ? (
          infoArr.map((character) => (
            <Character character={character} showPopup={(character) => {
              showPopup(character)
            }}/>
          ))
        ) : null}
        {currentInfo === "episodes" ? (
          <EpisodesTable infoArr={infoArr} />
        ) : null}
        {currentInfo === "locations" ? (
          <LocationsTable infoArr={infoArr} />
        ) : null}
        </ul>
        <div className='paginationContainer'>
            <Pagination
                count={pageLimit}
                page={page}
                color="primary"
                onChange={(event, newPage) => {
                  handlePageChange(newPage);
                }}
            />
        </div> 
      </div>
      <div className="popup" style={{ transform: popupVisible ? 'scale(1)' : 'scale(0)' }} onClick={hidePopup}>
      <img src={currentCharacter.image} alt={currentCharacter.id} />
      <ul>
        <h2>{currentCharacter.name}</h2>
          <li>Gender - <span>{currentCharacter.gender}</span></li>
          <li>Species - <span>{currentCharacter.species}</span></li>
          <li>Location - <span>{currentCharacter.location && currentCharacter.location.name}</span></li>
          <li>Status - <span>{currentCharacter.status}</span></li>
      </ul>
    </div> 
    </>
    );
}
