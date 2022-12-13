import './App.css';
import LoginPage from './components/login-page/LoginPage';
import ModelPageList from './components/modelPage/ModelPageList';
import AddModel from './components/modelPage/AddModel';
import EditModel from './components/modelPage/EditModel';

import AddIngredient from './components/ingredientPage/AddIngredient';
import IngredientPageList from './components/ingredientPage/IngredientPageList';
import EditIngredient from './components/ingredientPage/EditIngredient';

import { Routes, Route, Navigate } from "react-router-dom";

const AnonymousGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  console.log(role);
  switch(role){
    case 'admin':
      return  <Navigate to='/modeles'/>;
    case 'rd':
      return <Navigate to='/ingredients'/>;

    default:
      return <Component {...props} />;
  }
}

const AdminGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  if(role==='admin'){
    return <Component {...props} />;
  } else {
    return <Navigate to='/login'/>;
  }
}

const RdGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  if(role==='rd'){
    return <Component {...props}/>;
  } else {
    return <Navigate to='/login'/>;
  }
}

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<AnonymousGuard component={LoginPage}/>} />
        <Route exact path="/modeles" element={<AdminGuard component={ModelPageList}/>} />
        <Route exact path="/addModel" element={<AdminGuard component={AddModel}/>} />
        <Route exact path="/editModel/:id" element={<AdminGuard component={EditModel}/>} />
        <Route exact path="/ingredients" element={<RdGuard component={IngredientPageList}/>} />
        <Route exact path="/addIngredient" element={<RdGuard component={AddIngredient}/>} />
        <Route exact path="/editIngredient/:id" element={<RdGuard component={EditIngredient}/>} />
        <Route exact path="*" element={<Navigate to='/login'/>} />
      </Routes>
    </div>
  );
}

export default App;
