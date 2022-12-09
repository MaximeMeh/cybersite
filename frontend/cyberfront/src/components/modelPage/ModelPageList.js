import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

function ModelPageList() {

    const [models, setModels] = useState([]);
  
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

  return (
    <div>
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { models.map((model, index) => (
                      
                        <tr key={ model.id }>
                            <td>{ index + 1 }</td>
                            <td>{ model.nom }</td>
                            <td>{ model.description }</td>
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
