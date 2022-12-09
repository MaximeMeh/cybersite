import { useState } from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
 
const AddModel = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const history = useHistory();
 
    const saveModel = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products',{
            name: name,
            desc: desc
        });
        history.push("/");
    }
 
    return (
        <div>
            <form onSubmit={ saveModel }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Price</label>
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