import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"


function ModelPageList() {

    const [models, setModels] = useState([]);
    const [searchInput, setSearchInput] = useState("");
  
    useEffect(() => {
      getModels();
    }, []);

    const getModels = async () => {
      const response = await axios.get(process.env.REACT_APP_URL_MODELS);

      setModels(response.data);
    };

    const deleteModel = async (id) => {
      await axios.delete(process.env.REACT_APP_URL_MODELS+`/${id}`);
      getModels();
    }

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    
    if (searchInput.length > 0) {
        models.filter((model) => {
        return model.nom.match(searchInput);
    });
    }

  return (
    <div>
      {/* <SearchModel/> */}
      <input
        type="search"
        placeholder="Nom du modèle"
        onChange={handleChange}
        value={searchInput} />
        
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>pUHT</th>
                        <th>Gamme</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { models.filter(li => li.nom.toLowerCase().includes(searchInput.toLowerCase()))
                            .map((model, index) => (
                      
                        <tr key={ model.id }>
                            <td>{ index + 1 }</td>
                            <td>{ model.nom }</td>
                            <td>{ model.description }</td>
                            <td>{ model.puht }</td>
                            <td>{ model.gamme }</td>
                            <td>
                                <Link to={`/edit/${model.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteModel(model.id) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
  )
}

export default ModelPageList
