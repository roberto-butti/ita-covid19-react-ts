import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import DashboardItaly from "./containers/DashboardItaly/DashboardItaly";
import ScrollToTop from "./helpers/ScrollToTop";

function App() {
  return (
    <Router>
      
        <ScrollToTop />
        <NavBar></NavBar>
        <div className="container w-full mx-auto pt-20">
          <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-grey-darkest leading-normal">
            <Switch>

              <Route path="/regioni">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/">
                <DashboardItaly></DashboardItaly>
              </Route>

            </Switch>


          </div>
        </div>
      
    </Router>
  );
}

export default App;
