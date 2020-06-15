import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import * as V from 'victory';
// import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import {connect} from 'react-redux';
import {fetchUserAction} from "./actions/myaction";
import { STATES } from "mongoose";

function App(props) {
  useEffect(()=> {
    props.fetch_user()
  })
  return (
    <Router>
      <div>
        <StoreProvider>
          {/* <Nav /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user:()=> {dispatch(fetchUserAction())}
  }
} 


export default connect(null, mapDispatchToProps)(App);
