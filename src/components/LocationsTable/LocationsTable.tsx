import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

import { IInfo, IProps } from './interfaces';

const LocationsTable: React.FC<IProps> = ({ infoArr }) => {
  return (
    <TableContainer sx={{ width: 1100, display: 'flex', justifyContent: 'center' }} component={Paper}>
      <Table size="medium" aria-label="a dense table">
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
          {infoArr.map((row: IInfo) => (
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
  );
}

export default LocationsTable;