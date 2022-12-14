import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../header/Header";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField  } from "@mui/material";


function ProcedePageList() {

    const [procedes, setProcedes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
  
    useEffect(() => {
      getProcedes();
    }, []);

    const getProcedes = async () => {
      const response = await axios.get(process.env.REACT_APP_URL_PROCEDES);

      setProcedes(response.data);
    };

    const deleteProcede = async (id) => {
      await axios.delete(process.env.REACT_APP_URL_PROCEDES+`/${id}`);
      getProcedes();
    }

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    
    if (searchInput.length > 0) {
        procedes.filter((procede) => {
        return procede.nom.match(searchInput);
    });
    }

  return (
    <div>
      <Header/>
      <br/>
      <TextField 
        variant="standard"
        type="search"
        placeholder="Nom du procédé"
        onChange={handleChange}
        value={searchInput} />
        
        <Button variant="contained"><Link to="/addProcede" className="button is-primary mt-2">Ajouter</Link></Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow style={{'fontWeight': 'bold !important'}}>
                          <TableCell>No</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Test</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      { procedes.filter(li => li.nom.toLowerCase().includes(searchInput.toLowerCase()))
                              .map((procede, index) => (
                        
                          <TableRow key={ procede.id }>
                              <TableCell >{ index + 1 }</TableCell >
                              <TableCell >{ procede.nom }</TableCell >
                              <TableCell >{ procede.description }</TableCell >
                              <TableCell >{ procede.test }</TableCell >
                              <TableCell >
                                  <Button variant="contained"><Link to={`/editProcede/${procede.id}`} className="button is-small is-info">Éditer</Link></Button>
                                  <Button variant="outlined" color="error" onClick={ () => deleteProcede(procede.id) }>Supprimer</Button>
                              </TableCell>
                          </TableRow>
                      )) }
                      
                  </TableBody>
              </Table>
            </TableContainer>
        </div>
  )
}

export default ProcedePageList
