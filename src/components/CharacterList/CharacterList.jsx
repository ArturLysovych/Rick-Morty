import React, { useState, useEffect } from 'react';
import Character from '../Character/Character';
import './css/CharacterList.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/services/api';
import { fetchEpisodes } from '../../redux/services/api';
import { fetchLocations } from '../../redux/services/api';
import { Pagination, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';

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
      <div className="CharacterList">
        <div className="popup" style={{ display: popupVisible ? 'flex' : 'none' }}>
          <img src={currentCharacter.image} alt={currentCharacter.id} />
          <h2>{currentCharacter.name}</h2>
          <button onClick={hidePopup}>hide</button>
        </div>
        <h1>Rick Morty Characters</h1>
        <div className="buttons">
          <Button variant="contained" onClick={() => {setCurrentInfo("characters"); setPage(1);}}>Characters</Button>
          <Button variant="contained" onClick={() => {setCurrentInfo("episodes"); setPage(1);}}>Episodes</Button>
          <Button variant="contained" onClick={() => {setCurrentInfo("locations"); setPage(1);}}>Locations</Button>
        </div>
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
          <TextField id="standard-basic" label="Outlined" variant="standard" className='nameInput' onChange={(e) => {
            setFilterName(e.target.value)
          }} />
        </div>
        <ul>
        {currentInfo === "characters" ? (
          infoArr.map((character) => (
            <Character character={character} showPopup={(character) => {
              showPopup(character)
            }}/>
          ))
        ) : null}
        {currentInfo === "episodes" ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Episode</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {infoArr.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.episode}</TableCell>
                      <TableCell align="right">{row.air_date}</TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        ) : null}
        {currentInfo === "locations" ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, maxWidth:800 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Dimensions</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {infoArr.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.dimension}</TableCell>
                      <TableCell align="right">{row.created}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
    );
}
