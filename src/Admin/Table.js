import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, numUsers, numTexts, numImages, numVideos) {
  return { name, numUsers, numTexts, numImages, numVideos };
}


export default function SimpleTable({ numUsers, numTexts, numImages, numVideos}) {
  const classes = useStyles();

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
            <TableCell align="right">images</TableCell>
            <TableCell align="right">videos</TableCell>
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