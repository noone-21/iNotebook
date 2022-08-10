import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <SignUp showAlert={showAlert}/>
              </Route>
            </Switch>
            <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
