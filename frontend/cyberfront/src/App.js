import './App.css';
import LoginPage from './components/login-page/LoginPage';
import ModelPage from '../src/components/modelPage/ModelPage';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/modele" element={<ModelPage />} />
      </Routes>
      
    </div>
  );
}

export default App;