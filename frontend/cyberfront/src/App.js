import './App.css';
import LoginPage from './components/login-page/LoginPage';
import ModelPageList from './components/modelPage/ModelPageList';
import AddModel from './components/modelPage/AddModel';
import EditModel from './components/modelPage/EditModel';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/modele" element={<ModelPageList />} />
        <Route path="/add" element={<AddModel />} />
        <Route path="/edit/:id" element={<EditModel />} />
      </Routes>
      
    </div>
  );
}

export default App;
