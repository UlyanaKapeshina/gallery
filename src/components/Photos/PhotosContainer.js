import React, { useState, useEffect } from "react";
import { api } from "./../../api";
import Preloader from "./../Preloader/Preloader";
import ErrorMessage from "./../Error/ErrorMessage";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";

import "./Photos.css";
import Photos from "./Photos";

function PhotosContainer(props) {
  let location = useLocation();

  const currentPhotos = location.state && location.state.currentPhotos;
  const currentTitle = location.state && location.state.currentTitle;

  const { albumId, photoId } = useParams();
  const [photos, setPhotos] = useState(currentPhotos);
  const [title, setTitle] = useState(currentTitle);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    const getAlbum =
      photos ||
      api.getAlbum(albumId).then((album) => {
        setTitle(title);
      });
    const getPhotos =
      title ||
      api.getPhotos(albumId).then((photos) => {
        setPhotos(photos);
        if (!photoId) {
          return;
        }
        const photo = photos.find((it) => it.id === parseInt(photoId));
        if (photo) {
          setCurrentPhoto(photo);
          setIsModal(true);
        } else {
          throw new Error("Фоторгафия не найдена");
        }
      });
    Axios.all([getPhotos, getAlbum])
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded || !photos) {
    return <Preloader />;
  } else if (error) {
    return <ErrorMessage message={error.message} />;
  } else if (isLoaded) {
    return (
      <Photos
        photos={photos}
        title={title}
        modal={isModal}
        photo={currentPhoto}
        history={props.history}
      />
    );
  }
}

export default PhotosContainer;
