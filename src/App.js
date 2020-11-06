import React from "react";
import "./App.css";
import PhotosContainer from "./components/Photos/PhotosContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Switch, Redirect, Route } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import AlbumsContainer from "./components/Albums/AlbumsContainer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <section className="main">
        <Switch>
          <Redirect exact from="/" to="/users" />
          <Route exact path="/users" component={UsersContainer} />
          <Route
            exact
            path="/users/:userId/albums"
            component={AlbumsContainer}
          />
          <Route
            exact
            path="/users/:userId/albums/:albumId/photos/:photoId?"
            component={PhotosContainer}
          />
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default App;
