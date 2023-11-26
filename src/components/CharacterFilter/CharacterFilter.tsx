import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ICharacterFilterProps } from './interfaces';

const CharacterFilter: React.FC<ICharacterFilterProps> = ( props ) => {
    const {
        filterStatus,
        filterGender,
        filterName,
        handleChangeStatus,
        handleChangeGender,
        setFilterName
    } = props;

    return (
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
              setFilterName(e.target.value);
            }} />
        </div>
    );
}

export default CharacterFilter;
