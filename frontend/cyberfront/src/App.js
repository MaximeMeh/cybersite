import './App.css';
import LoginPage from './components/login-page/LoginPage';
import ModelPageList from './components/modelPage/ModelPageList';
import AddModel from './components/modelPage/AddModel';
import EditModel from './components/modelPage/EditModel';

import AddIngredient from './components/ingredientPage/AddIngredient';
import IngredientPageList from './components/ingredientPage/IngredientPageList';
import EditIngredient from './components/ingredientPage/EditIngredient';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage/>} />
        <Route exact path="/modeles" element={<ModelPageList />} />
        <Route exact path="/addModel" element={<AddModel />} />
        <Route exact path="/editModel/:id" element={<EditModel />} />
        <Route exact path="/ingredients" element={<IngredientPageList />} />
        <Route exact path="/addIngredient" element={<AddIngredient />} />
        <Route exact path="/editIngredient/:id" element={<EditIngredient />} />
      </Routes>
    </div>
  );
}

export default App;
