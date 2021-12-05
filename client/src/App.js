import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Mern/navbar";
import Edit from "./components/Mern/edit";
import Create from "./components/Mern/create";
import RecordList from "./components/Mern/recordList";

import Clock from "./components/Grid/Clock";
import Grid from "./components/Grid/Grid";


const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <RecordList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/grid">
        <Clock/>
        <Grid/>
      </Route>
    </div>
  );
};

export default App;
