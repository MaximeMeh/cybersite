import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import Header from '../header/Header';
 
const EditProcede = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [test, setTest] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateProcede = async (e) => {
        e.preventDefault();
        await axios.patch(process.env.REACT_APP_URL_PROCEDES+`/${id}`,{
            nom: name,
            description: desc,
            test: test
        });
        navigate("/procedes");
    }
 
    useEffect(() => {
        const getProcedeById = async () => {
            const response = await axios.get(process.env.REACT_APP_URL_PROCEDES+`/${id}`);
            setName(response.data.nom);
            setDesc(response.data.description);
            setTest(response.data.test);
        }
        getProcedeById();
    }, [id]);
 
    return (
        <div>
            <Header/>
            <h2>Éditer</h2>
            <form onSubmit={ updateProcede }>
                <div className="field">
                    <label className="label">Nom</label>
                    <TextField variant='standard' size="small" 
                        className="input"
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
 
                <div className="field">
                    <Button variant='contained' type='submit'>Changer</Button>
                </div>
            </form>
        </div>
    )
}
 
export default EditProcede