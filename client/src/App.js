import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import * as V from 'victory';
// import Nav from "./components/Nav";
// import { CalendarProvider } from "./utils/GlobalState";

function App() {
  return (
    <Router>
      <div>
        {/* <CalendarProvider> */}
          {/* <Nav /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
          </Switch>
        {/* </CalendarProvider> */}
      </div>
    </Router>
  );
}

export default App;
