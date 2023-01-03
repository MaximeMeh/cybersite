import './App.css';
import LoginPage from './components/login-page/LoginPage';
import { Routes, Route, Navigate } from "react-router-dom";
import ModelPageList from './components/modelPage/ModelPageList';
import AddModel from './components/modelPage/AddModel';
import EditModel from './components/modelPage/EditModel';

import AddIngredient from './components/ingredientPage/AddIngredient';
import IngredientPageList from './components/ingredientPage/IngredientPageList';
import EditIngredient from './components/ingredientPage/EditIngredient';


import ProcedePageList from './components/procedePage/ProcedePageList';
import AddProcede from './components/procedePage/AddProcede';
import EditProcede from './components/procedePage/EditProcede';

const AnonymousGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  switch(role){
    case 'User':
      return  <Navigate to='/modeles'/>;
    case 'rd':
      return <Navigate to='/ingredients'/>;
    case 'pro':
      return <Navigate to='/procedes'/>;

    default:
      return <Component {...props} />;
  }
}

const AdminGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  if(role==='User'){
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

const ProGuard = ({component : Component, ...props}) =>{

  const role = localStorage.getItem('role');
  if(role==='pro'){
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
        {/* Modeles */}
        <Route exact path="/modeles" element={<AdminGuard component={ModelPageList}/>} />
        <Route exact path="/addModel" element={<AdminGuard component={AddModel}/>} />
        <Route exact path="/editModel/:id" element={<AdminGuard component={EditModel}/>} />
        {/* Ingredients */}
        <Route exact path="/ingredients" element={<RdGuard component={IngredientPageList}/>} />
        <Route exact path="/addIngredient" element={<RdGuard component={AddIngredient}/>} />
        <Route exact path="/editIngredient/:id" element={<RdGuard component={EditIngredient}/>} />
        {/* Procede */}
        <Route exact path="/procedes" element={<ProGuard component={ProcedePageList}/>}/>
        <Route exact path="/addProcede" element={<ProGuard component={AddProcede}/>}/>
        <Route exact path="/editProcede/:id" element={<ProGuard component={EditProcede}/>}/>
        {/* Wildcard */}
        <Route exact path="*" element={<Navigate to='/login'/>} />
      </Routes>
    </div>
  );
}

export default App;
