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


function IngredientPageList() {

    // const navigate = useNavigate;

    const [ingredients, setIngredients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
  
    useEffect(() => {
      getIngredients();
    }, []);

    const getIngredients = async () => {
      const response = await axios.get(process.env.REACT_APP_URL_INGREDIENTS);

      setIngredients(response.data);
    };

    const deleteIngredient = async (id) => {
      await axios.delete(process.env.REACT_APP_URL_INGREDIENTS+`/${id}`);
      getIngredients();
    }

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    
    if (searchInput.length > 0) {
        ingredients.filter((ingredient) => {
        return ingredient.ingredientName.match(searchInput);
    });
    }

  return (
    <div>
      <Header/>
      <br/>
      <TextField 
        variant="standard"
        type="search"
        placeholder="Nom de l'ingrédient"
        onChange={handleChange}
        value={searchInput} />
        
        <Button variant="contained"><Link to="/addIngredient" className="button is-primary mt-2">Ajouter</Link></Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow style={{'fontWeight': 'bold !important'}}>
                          <TableCell>No</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Grammage</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      { ingredients.filter(li => li.ingredientName.toLowerCase().includes(searchInput.toLowerCase()))
                              .map((ingredient, index) => (
                        
                          <TableRow key={ ingredient.id }>
                              <TableCell >{ index + 1 }</TableCell >
                              <TableCell >{ ingredient.ingredientName }</TableCell >
                              <TableCell >{ ingredient.ingredientDescription }</TableCell >
                              <TableCell >{ ingredient.grammage }</TableCell >
                              <TableCell >
                                  <Button variant="contained"><Link to={`/editIngredient/${ingredient.id}`} className="button is-small is-info">Éditer</Link></Button>
                                  <Button variant="outlined" color="error" onClick={ () => deleteIngredient(ingredient.id) }>Supprimer</Button>
                              </TableCell>
                          </TableRow>
                      )) }
                      
                  </TableBody>
              </Table>
            </TableContainer>
        </div>
  )
}

export default IngredientPageList
