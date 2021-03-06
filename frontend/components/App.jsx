import React from 'react';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { Switch, Redirect } from 'react-router-dom';

const App = () => (
  <div>
    <section className='form-section'>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>  
    </section>
  </div>
);

export default App;