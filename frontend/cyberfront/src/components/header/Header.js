import React from 'react'

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function Header() {

  const navigate = useNavigate();

  function deco(){
    localStorage.removeItem('role');
    navigate('/');
  }

  return (
    <div>
      <h1>KillerBee</h1>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        { localStorage.getItem('role') === null && <Button><Link to="/">Se Connecter</Link></Button>}
        { localStorage.getItem('role') !== null && <Button onClick={deco}>Se Déconnecter</Button>}
        { localStorage.getItem('role') === 'admin' && <Button><Link to="/modeles">Modèles</Link></Button>}
        { localStorage.getItem('role') === 'rd' && <Button><Link to="/ingredients">Ingrédients</Link></Button>}
        { localStorage.getItem('role') === 'pro' && <Button><Link to="/procedes">Procédés</Link></Button>}
      </ButtonGroup> 
      
    </div>
  )
}

export default Header
