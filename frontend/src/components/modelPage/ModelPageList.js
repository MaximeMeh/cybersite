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


function ModelPageList() {

    // const navigate = useNavigate;

    const [models, setModels] = useState([]);
    const [searchInput, setSearchInput] = useState("");
  
    useEffect(() => {
      getModels();
    }, []);

    const getModels = async () => {
      const response = await axios.get(process.env.REACT_APP_URL_MODELS);

      setModels(response.data);
    };

    const deleteModel = async (id) => {
      await axios.delete(process.env.REACT_APP_URL_MODELS+`/${id}`);
      getModels();
    }

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    
    if (searchInput.length > 0) {
        models.filter((model) => {
        return model.nom.match(searchInput);
    });
    }

  return (
    <div>
      <Header/>
      <br/>
      <TextField 
        variant="standard"
        type="search"
        placeholder="Nom du modèle"
        onChange={handleChange}
        value={searchInput} />
        
        <Button variant="contained"><Link to="/addModel" className="button is-primary mt-2">Ajouter</Link></Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow style={{'fontWeight': 'bold !important'}}>
                          <TableCell>No</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>pUHT</TableCell>
                          <TableCell>Gamme</TableCell>
                          <TableCell>Actions</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      { models.filter(li => li.nom.toLowerCase().includes(searchInput.toLowerCase()))
                              .map((model, index) => (
                        
                          <TableRow key={ model.id }>
                              <TableCell >{ index + 1 }</TableCell >
                              <TableCell >{ model.nom }</TableCell >
                              <TableCell >{ model.description }</TableCell >
                              <TableCell >{ model.puht } €</TableCell >
                              <TableCell >{ model.gamme }</TableCell >
                              <TableCell >
                                  <Button variant="contained"><Link to={`/editModel/${model.id}`} className="button is-small is-info">Éditer</Link></Button>
                                  <Button variant="outlined" color="error" onClick={ () => deleteModel(model.id) }>Supprimer</Button>
                              </TableCell>
                          </TableRow>
                      )) }
                      
                  </TableBody>
              </Table>
            </TableContainer>
        </div>
  )
}

export default ModelPageList
