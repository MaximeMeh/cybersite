import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
const AddModel = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [puht, setPuht] = useState();
    const [gamme, setGamme] = useState('');
    const navigate = useNavigate();
 
    const saveModel = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_URL_MODELS,{
            nom: name,
            description: desc,
            puht: puht,
            gamme: gamme
        });
        navigate("/modele");
    }
 
    return (
        <div>
            <form onSubmit={ saveModel }>
                <div className="field">
                    <label className="label">Nom</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Name"
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
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddModel