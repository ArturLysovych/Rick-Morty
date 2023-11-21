import React, { useState, useEffect } from 'react';
import EpisodesTable from '../EpisodesTable/EpisodesTable';
import LocationsTable from '../LocationsTable/LocationsTable';
import Character from '../Character/Character';
import './css/CharacterList.css';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/services/api';
import { fetchEpisodes } from '../../redux/services/api';
import { fetchLocations } from '../../redux/services/api';
import { Pagination, Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

interface ICurrentCharacter {
  id: number;
  name: string;
  gender: string;
  species: string;
  location?: { name: string };
  status: string;
  type?: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<ICurrentCharacter>({ id: 0, name: '', gender: '', species: '', status: '', image: '' });
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [currentInfo, setCurrentInfo] = useState<string>('characters');
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(42);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const characters = useSelector((state: RootState) => state.characters.list);
  const episodes = useSelector((state: RootState) => state.episodes.list);
  const locations = useSelector((state: RootState) => state.locations.list);
  const charactersPages = useSelector((state: RootState) => state.characters.limit);
  const episodesPages = useSelector((state: RootState) => state.episodes.limit);
  const locationsPages = useSelector((state: RootState) => state.locations.limit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters({ page, status: filterStatus, gender: filterGender, name: filterName }) as any);
    dispatch(fetchLocations({ page }) as any);
    dispatch(fetchEpisodes({ page }) as any);
  }, [dispatch, page, filterStatus, filterGender, filterName]);

  useEffect(() => {
    if (currentInfo === "characters") setPageLimit(charactersPages);
    if (currentInfo === "episodes") setPageLimit(episodesPages)
    if (currentInfo === "locations") setPageLimit(locationsPages);
  }, [currentInfo, charactersPages, episodesPages, locationsPages, page]);

  const handlePageChange = (newPage: number): void =>  {
    setPage(newPage);
  };

  const showPopup = (character: ICurrentCharacter): void => {
    setCurrentCharacter(character);
    setPopupVisible(true);
  };  

  const hidePopup = ():void => {
    setPopupVisible(false);
  };

  const handleChangeStatus = (event: SelectChangeEvent<string>): void => {
    setFilterStatus(event.target.value);
  };

  const handleChangeGender = (event: SelectChangeEvent<string>): void => {
    setFilterGender(event.target.value);
  };

  return (
    <>
      <div className="CharacterList">
        <h2>Rick Morty Info</h2>
        <ButtonGroup variant="outlined" aria-label="outlined button group" size='large' style={{ boxShadow: '0 0 5px #01B4C6' }}>
          <Button onClick={() => { setCurrentInfo("characters"); setPage(1); }}>Characters</Button>
          <Button onClick={() => { setCurrentInfo("episodes"); setPage(1); }}>Episodes</Button>
          <Button onClick={() => { setCurrentInfo("locations"); setPage(1); }}>Locations</Button>
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
            }} />
          </div>
        ) : null}
        <ul>
          {currentInfo === "characters" ? 
              characters.map((character: any) => (
                <Character
                  key={character.id}
                  character={character}
                  showPopup={(char) => { showPopup(char as any) }}
                />
                )
          ) : null}
          {currentInfo === "episodes" ? (
            <EpisodesTable infoArr={episodes as any} />
          ) : null}
          {currentInfo === "locations" ? (
            <LocationsTable infoArr={locations as any} />
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
    </>
  );
}

export default CharacterList;