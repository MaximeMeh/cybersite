import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Header from '../header/Header';
 
const AddModel = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [puht, setPuht] = useState('');
    const [gamme, setGamme] = useState('');
    const navigate = useNavigate();
 
    const saveModel = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_URL_MODELS,{
            freezbeName: name,
            freezbeDescription: desc,
            puht: parseFloat(puht),
            freezbeRange: gamme
        });
        navigate("/modeles");
    }
 
    return (
        <div>
            <Header/>
            <h2>Ajouter</h2>
            <form onSubmit={ saveModel }>
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
                    <label className="label">pUHT</label>
                    <TextField variant='standard' size="small" 
                        className="input"
                        type="float"
                        placeholder="Prix Unitaire Hors Taxe"
                        value={ puht }
                        onChange={ (e) => setPuht(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Gamme: </label>
                    <TextField variant='standard' size="small"
                        className="input"
                        required
                        type="text"
                        placeholder="Gamme"
                        value={ gamme }
                        onChange={ (e) => setGamme(e.target.value) }
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
 
export default AddModel