import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Header from '../header/Header';
 
const EditIngredient = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateIngredient = async (e) => {
        e.preventDefault();
        await axios.patch(process.env.REACT_APP_URL_INGREDIENTS+`/${id}`,{
            nom: name,
            description: desc
        });
        navigate("/ingredients");
    }
 
    useEffect(() => {
        const getModelById = async () => {
            const response = await axios.get(process.env.REACT_APP_URL_INGREDIENTS+`/${id}`);
            setName(response.data.nom);
            setDesc(response.data.description);
        }
        getModelById();
    }, [id]);
 
    return (
        <div>
            <Header/>
            <h2>Éditer</h2>
            <form onSubmit={ updateIngredient }>
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
                    <Button variant='contained' type='submit'>Changer</Button>
                </div>
            </form>
        </div>
    )
}
 
export default EditIngredient