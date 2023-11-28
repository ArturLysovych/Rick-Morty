import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

import { IProps } from './interfaces';

const InfoButtonGroup: React.FC<IProps> = ( props ) => {
    const { setCurrentInfo, setPage } = props;

    return (
        <div className='btn-group'>
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="large" style={{ boxShadow: '0 0 5px #6F256F' }}>
            <Button onClick={() => { setCurrentInfo("characters"); setPage(1); }}>Characters</Button>
            <Button onClick={() => { setCurrentInfo("episodes"); setPage(1); }}>Episodes</Button>
            <Button onClick={() => { setCurrentInfo("locations"); setPage(1); }}>Locations</Button>
          </ButtonGroup>
        </div>
    );
}

export default InfoButtonGroup;
