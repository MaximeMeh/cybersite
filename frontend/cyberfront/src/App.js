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
        <Route exact path="/" element={<LoginPage/>} />
        <Route exact path="/modele" element={<ModelPageList />} />
        <Route exact path="/add" element={<AddModel />} />
        <Route exact path="/edit/:id" element={<EditModel />} />
      </Routes>
    </div>
  );
}

export default App;
