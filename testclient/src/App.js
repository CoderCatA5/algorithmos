import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AddSubmission from "./components/add-submission.component";
import Submission from "./components/submission.component";
import SubmissionsList from "./components/submissions-list.component";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/submissions"} className="navbar-brand">
            algorithmos
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/submissions"} className="nav-link">
                Submissions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/submissions"]} component={SubmissionsList} />
            <Route exact path="/add" component={AddSubmission} />
            <Route path="/submissions/:id" component={Submission} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
