import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface IProps {
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const InfoButtonGroup: React.FC<IProps> = ( props ) => {
    const { setCurrentInfo, setPage } = props;

    return (
        <div className='btn-group'>
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="large" style={{ boxShadow: '0 0 5px #01B4C6' }}>
            <Button onClick={() => { setCurrentInfo("characters"); setPage(1); }}>Characters</Button>
            <Button onClick={() => { setCurrentInfo("episodes"); setPage(1); }}>Episodes</Button>
            <Button onClick={() => { setCurrentInfo("locations"); setPage(1); }}>Locations</Button>
          </ButtonGroup>
          <button onClick={() => { setCurrentInfo("watchlist"); setPage(1); }} className='watchList-btn'>WATCH LIST</button>
        </div>
    );
}

export default InfoButtonGroup;
