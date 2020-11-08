import React, {useEffect, useState} from "react";
import { api } from "./../../api";
import Preloader from "./../Preloader/Preloader";
import ErrorMessage from "./../Error/ErrorMessage";
import { useLocation, useParams } from "react-router-dom";

import "./Albums.css"
import Axios from "axios";

import Albums from "./Albums";

function AlbumsContainer() {
  const { userId } = useParams();
  let location = useLocation();
  const currentUser = location.state && location.state.user;
  
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState(currentUser);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

  const getAlbums = api
  .getAlbums(userId)
  .then((result) => {
    setAlbums(result)
  })
  .catch((error) => {    
    setError(error)
  });
  const getUser = currentUser || api.getUser(userId)
  .then((result) => {
    setUser(result)
  })
  .catch((error) => {    
    setError(error)
  });
    Axios.all([getAlbums,getUser])
      .then((result) => {
        setIsLoaded(true)
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error)
      });
    }, []);

 
    if (!isLoaded) {
      return <Preloader />;
    } else if (error) {
      return <ErrorMessage message={error.message} />;
    } else if (!albums || !user) {
      return <Preloader />;
    } else if (isLoaded) {
        return <Albums albums={albums} user={user} />
    }
 
}

export default AlbumsContainer;
