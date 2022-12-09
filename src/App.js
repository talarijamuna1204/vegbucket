import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import BucketView from "./components/BucketView";
import Sucessfull from "./components/SuccessOrder";
import Failed from "./components/FailOrder";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/vegbucket/:id" component={BucketView} />
          <Route exact path="/sucessfull" component={Sucessfull} />
          <Route exact path="/failed" component={Failed} />
          <Route exact path="/vegbucket" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
