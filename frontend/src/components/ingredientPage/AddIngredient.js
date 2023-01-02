import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Header from '../header/Header';
 
const AddIngredient = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [gram, setGram] = useState('');
    const navigate = useNavigate();
 
    const saveIngr = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_URL_INGREDIENTS,{
            nom: name,
            description: desc,
            gramme: parseFloat(gram)
        });
        navigate("/ingredients");
    }
 
    return (
        <div>
            <Header/>
            <h2>Ajouter</h2>
            <form onSubmit={ saveIngr }>
                <div className="field">
                    <label className="label">Nom</label>
                    <TextField variant='standard' size="small" 
                        className="input"
                        required
                        type="text"
                        placeholder="Nom"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Description</label>
                    <TextField variant='standard' size="small" 
                        className="input"
                        required
                        type="text"
                        placeholder="Description"
                        value={ desc }
                        onChange={ (e) => setDesc(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Grammage</label>
                    <TextField variant='standard' size="small" 
                        className="input"
                        required
                        type="float"
                        placeholder="Grammage"
                        value={ gram }
                        onChange={ (e) => setGram(e.target.value) }
                    />
                </div>
                <br/>
                <div className="field">
                    <Button variant='contained' type='submit'>Enregistrer</Button>
                </div>
            </form>
        </div>
    )
}
 
export default AddIngredient