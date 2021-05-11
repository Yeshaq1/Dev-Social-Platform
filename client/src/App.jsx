import React, { Fragment } from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />

        <section className='container'>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
