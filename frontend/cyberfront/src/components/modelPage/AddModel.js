import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
const AddModel = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const history = useNavigate();
 
    const saveModel = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_URL_MODELS,{
            nom: name,
            description: desc
        });
        history("/modele");
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
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddModel