import './App.css';
import Header from './component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from './component/Log In/Login';
import Home from './component/Select Ride/Ride';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Destination from './component/Destination/Destination';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState()

  return (
      <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
        <Header></Header>
          <Router>
            <Switch>
              <Route path='/home'>
                <Home></Home>
              </Route>
              <Route path="/map">
                <Destination></Destination>
              </Route>
              <Route path='/login'>
                <Login></Login>
              </Route>
            </Switch>
          </Router>
       </UserContext.Provider>
  );
}

export default App;
