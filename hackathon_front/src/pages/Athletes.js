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

function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`${API_URL}/athletes`)
      .then((response) => {
        setAthletes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching athletes:', error);
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
      <h2 style={{ textAlign: 'center' }}>Athlètes</h2>
      <div className="table-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div className="table-wrapper" style={{ width: '80%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="athletes table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom Complet</TableCell>
                  <TableCell>Date de Naissance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {athletes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((athlete) => (
                    <TableRow key={athlete.id}>
                      <TableCell>{athlete.id}</TableCell>
                      <TableCell>{athlete.full_name}</TableCell>
                      <TableCell>{athlete.birth}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={athletes.length}
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

export default Athletes;
