import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Header from '../header/Header';
 
const EditModel = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [puht, setPuht] = useState('');
    const [gamme, setGamme] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(process.env.REACT_APP_URL_MODELS+`/${id}`,{
            freezbeName: name,
            freezbeDescription: desc,
            puht: parseFloat(puht),
            freezbeRange: gamme
        });
        navigate("/modeles");
    }
 
    useEffect(() => {
        const getModelById = async () => {
            const response = await axios.get(process.env.REACT_APP_URL_MODELS+`/${id}`);
            setName(response.data.freezbeName);
            setDesc(response.data.freezbeDescription);
            setPuht(response.data.puht);
            setGamme(response.data.freezbeRange);
        }
        getModelById();
    }, [id]);
 
    return (
        <div>
            <Header/>
            <h2>Éditer</h2>
            <form onSubmit={ updateProduct }>
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
                    <label className="label">Gamme</label>
                    <TextField variant='standard' size="small" 
                        className="input"
                        type="text"
                        placeholder="Gamme"
                        value={ gamme }
                        onChange={ (e) => setGamme(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <Button variant='contained' type='submit'>Changer</Button>
                </div>
            </form>
        </div>
    )
}
 
export default EditModel