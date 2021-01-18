import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./Containers/Home";
import Offer from "./Containers/Offer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/offer">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
