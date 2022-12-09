import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
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
            nom: name,
            description: desc,
            puht: puht,
            gamme: gamme
        });
        navigate("/modele");
    }
 
    useEffect(() => {
        const getModelById = async () => {
            const response = await axios.get(process.env.REACT_APP_URL_MODELS+`/${id}`);
            setName(response.data.nom);
            setDesc(response.data.description);
            setPuht(response.data.puht);
            setGamme(response.data.gamme);
        }
        getModelById();
    }, [id]);
 
    return (
        <div>
            <form onSubmit={ updateProduct }>
                <div className="field">
                    <label className="label">Nom</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Nom"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Description</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Description"
                        value={ desc }
                        onChange={ (e) => setDesc(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">pUHT</label>
                    <input 
                        className="input"
                        type="float"
                        placeholder="Prix Unitaire Hors Taxe"
                        value={ puht }
                        onChange={ (e) => setPuht(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Gamme</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Gamme"
                        value={ gamme }
                        onChange={ (e) => setGamme(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditModel