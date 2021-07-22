import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard/Dashboard";
import "./assets/scss/App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <DashBoard />
      </Switch>
    </Router>
  );
}

export default App;
