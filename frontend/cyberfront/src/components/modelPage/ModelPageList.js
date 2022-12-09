import { useEffect, useState } from "react";

function ModelPageList() {

    const [models, setModels] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(process.env.REACT_APP_URL_MODELS);
        const data = await response.json();
        setModels(data);
      };
      fetchData();
    }, []);

  return (
    <>
      <h1>Modèles:</h1>
      <table>
        <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {models.map((model) => {
            
            return (
                <tr key={model.id}>
                  <td>{model.nom}</td>
                  <td>{model.description}</td>
                </tr>
            );
            })}
        </tbody>
      </table>
    </>
  )
}

export default ModelPageList
