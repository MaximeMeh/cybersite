import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import Header from '../header/Header';
 
const AddProcede = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [test, setTest] = useState('');
    
    const navigate = useNavigate();
 
    const savePro = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_URL_PROCEDES,{
            nom: name,
            description: desc,
            test: test
        });
        navigate("/procedes");
    }
 
    return (
        <div>
            <Header/>
            <h2>Ajouter</h2>
            <form onSubmit={ savePro }>
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
                    <label className="label">Test</label>
                    <Select variant='standard' size="small" 
                        className="input"
                        placeholder="Test"
                        value={ test }
                        onChange={ (e) => setTest(e.target.value) }>
                    
                        <MenuItem value={'Oui'}>Oui</MenuItem>
                        <MenuItem value={'Non'}>Non</MenuItem>
                    </Select>
                </div>
                <br/>
                <div className="field">
                    <Button variant='contained' type='submit'>Enregistrer</Button>
                </div>
            </form>
        </div>
    )
}
 
export default AddProcede