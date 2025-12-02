import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles()({
  table: {
    minWidth: 650,
  },
});

function createData(name, numUsers, numTexts, numImages, numVideos) {
  return { name, numUsers, numTexts, numImages, numVideos };
}


export default function SimpleTable({ numUsers, numTexts, numImages, numVideos}) {
  const { classes } = useStyles();

  const rows = [
    createData('all time', numUsers , numTexts, numImages, numVideos),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">users</TableCell>
            <TableCell align="right">texts</TableCell>
            <TableCell align="right">images</TableCell>
            <TableCell align="right">videos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.numUsers}</TableCell>
              <TableCell align="right">{row.numTexts}</TableCell>
              <TableCell align="right">{row.numImages}</TableCell>
              <TableCell align="right">{row.numVideos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}