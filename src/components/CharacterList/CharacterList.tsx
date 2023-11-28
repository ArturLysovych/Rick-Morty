import { Pagination } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, fetchEpisodes, fetchLocations } from '../../redux/services/api';
import { RootState } from '../../redux/store';
import Character from '../Character/Character';
import CharacterFilter from '../CharacterFilter/CharacterFilter';
import CharacterPopup from '../CharacterPopup/CharacterPopup';
import EpisodesTable from '../EpisodesTable/EpisodesTable';
import InfoButtonGroup from '../InfoButtonGroup/InfoButtonGroup';
import LocationsTable from '../LocationsTable/LocationsTable';
import WatchList from '../WatchList/WatchList';
import './css/base/CharacterList.css';
import { ICurrentCharacter, IEpisodeData, ILocationData } from './interfaces';

const CharacterList: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<ICurrentCharacter>({ id: 0, name: '', gender: '', species: '', status: '', image: '' });
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [currentInfo, setCurrentInfo] = useState<string>('characters');
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(42);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [info, setInfo] = useState(true);
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
    if (currentInfo === "episodes") setPageLimit(episodesPages);
    if (currentInfo === "locations") setPageLimit(locationsPages);
  }, [currentInfo, charactersPages, episodesPages, locationsPages, page]);

  const handlePageChange = (newPage: number): void =>  {
    setPage(newPage);
  };

  const showPopup = (character: ICurrentCharacter): void => {
    setCurrentCharacter(character);
    setPopupVisible(true);
  };  

  const hidePopup = (): void => {
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
        <div className="selectShow">
          <div className='select' onClick={():void =>  {
            setInfo(true);
          }}>
            <div></div>
          </div>
          <div className='select' onClick={():void => {
            setInfo(false);
          }}>
            <div></div>
          </div>
        </div>
        {info? (<h2>Rick Morty Info</h2>) : null}
        {info? (<InfoButtonGroup setCurrentInfo={setCurrentInfo} setPage={setPage} />)
             : <WatchList /> }
        {currentInfo === "characters" && info ? (
            <CharacterFilter
              filterStatus={filterStatus}
              filterGender={filterGender}
              filterName={filterName}
              handleChangeStatus={handleChangeStatus}
              handleChangeGender={handleChangeGender}
              setFilterName={setFilterName}
            />
        ) : null}
        <ul>
          {currentInfo === "characters" && info ? 
              characters.map((character: any) => (
                <Character
                  key={character.id}
                  character={character}
                  showPopup={(character: any) => { showPopup(character) }}
                />
                )
          ) : null}
          {currentInfo === "episodes" && info ? (
            <EpisodesTable infoArr={episodes as IEpisodeData[]} />
          ) : null}
          {currentInfo === "locations" && info ? (
            <LocationsTable infoArr={locations as ILocationData[]} />
          ) : null}
        </ul>
        {!info ? null : (
          <div className='paginationContainer'>
            <Pagination
              count={pageLimit}
              page={page}
              color="primary"
              onChange={(event, newPage) => { handlePageChange(newPage) }}
            />
          </div>
        )}
      </div>
      <CharacterPopup
        popupVisible={popupVisible}
        hidePopup={hidePopup}
        currentCharacter={currentCharacter}
      />
    </>
  );
}

export default CharacterList;