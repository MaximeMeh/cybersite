import './App.css';
import LoginPage from './components/login-page/LoginPage';
import ModelPageList from './components/modelPage/ModelPageList';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/modele" element={<ModelPageList />} />
      </Routes>
      
    </div>
  );
}

export default App;
