import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function Participations() {
  const [participations, setParticipations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`${API_URL}/participations`)
      .then((response) => {
        setParticipations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching participations:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Participations</h2>
      <div className="table-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div className="table-wrapper" style={{ width: '80%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="participations table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>ID du Jeu</TableCell>
                  <TableCell>ID de l'Athlète</TableCell>
                  <TableCell>ID du Pays</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Or</TableCell>
                  <TableCell align="right">Argent</TableCell>
                  <TableCell align="right">Bronze</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((participation) => (
                    <TableRow key={participation.id}>
                      <TableCell>{participation.id}</TableCell>
                      <TableCell>{participation.game_name}</TableCell>
                      <TableCell>{participation.athlete_name}</TableCell>
                      <TableCell>{participation.country_name}</TableCell>
                      <TableCell align="right">{participation.total}</TableCell>
                      <TableCell align="right">{participation.gold}</TableCell>
                      <TableCell align="right">{participation.silver}</TableCell>
                      <TableCell align="right">{participation.bronze}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={participations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Participations;
