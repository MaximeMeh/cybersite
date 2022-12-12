import React from 'react'

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function Header() {
  return (
    <div>
      <h1>KillerBee</h1>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button><Link to="/">Se Connecter</Link></Button>
        <Button>Se Déconnecter</Button>
        <Button><Link to="/modele">Modele</Link></Button>
      </ButtonGroup> 
      
    </div>
  )
}

export default Header
