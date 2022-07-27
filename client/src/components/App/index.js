import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import AppBar from '../AppBar';
import Search from "../Search";
import Reviews from "../Reviews";
import MyPage from "../MyPage";
import Landing from "../Landing";
import {AuthProvider} from "../../auth";
import SignIn from "../SignIn";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <AuthProvider>
      <Router>
        <div>
          <AppBar />
        </div>
        <div style={{paddingTop: '40px'}}>
          <Route exact path="/" component={Landing}/>
          <Route path={'/signIn'} component={SignIn} />
          <Route path={'/search'} component={Search} />
          <PrivateRoute path={'/reviews'} >
            <Reviews />
          </PrivateRoute>
          <PrivateRoute path={'/myPage'} >
            <MyPage />
          </PrivateRoute>
        </div>
      </Router>
    </AuthProvider>
    );
  }
}

export default App;