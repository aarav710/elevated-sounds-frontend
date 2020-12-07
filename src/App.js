import React, { Suspense, useEffect, useReducer, useState } from 'react';
import NavBar from './components/NavigationBar';
import './App.css';
import './fonts.css';
import DialogContext from './DialogContext'
import userIDContext from './Context';
import Loading from './components/Loading';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const Products = React.lazy(() => import('./Products'));
const Homepage = React.lazy(() => import('./Homepage'));
const FormRegSign = React.lazy(() => import('./FormRegSign'));
const Cart = React.lazy(() => import('./Cart'));

const userFunction = (state, action) => {
  switch (action.type) {
    case 'LOG OUT':
      return { ID: null };
    case 'SIGN IN':
      return { ID: action.ID };
    case 'INIT':
      return {ID: action.ID}
    default:
      return;
  };
};

const App = () => {
  const [category, setCategory] = useState('all');
  const [user, setUser] = useReducer(userFunction, { ID: null });
  const [open, setOpen] = useState(false);
  const settingCategory = newCategory => setCategory(newCategory);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=> {
    fetch('https://vigorous-spence-6bc528.netlify.app/api/checkUser',{
      credentials: 'include',
      headers: {
      'Content-Type': 'application/json',
    },
  }).then(response=> response.json()).then(res => setUser({type: 'INIT', ID: res.user_id}))
  },[]);
  return (
    <Router>
      <div className="body">
        <NavBar updateUser={setUser} user={user} />
        <Suspense fallback={<Loading/>}>
          <Switch>
            <DialogContext.Provider value={{ handleClickOpen, handleClose, open }}>
              <userIDContext.Provider value={user.ID}>
                <Route path="/" exact render={() => <Homepage settingCategory={settingCategory} />} />
                <Route path="/products" render={() => <Products settingCategory={settingCategory} category={category} />} />
                <Route path='/signin' render={() => <FormRegSign updateUser={setUser} method='signin' />} />
                <Route path='/register' render={() => <FormRegSign updateUser={setUser} method='register' />} />
                <Route path='/cart' component={Cart} />
              </userIDContext.Provider>
            </DialogContext.Provider>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;