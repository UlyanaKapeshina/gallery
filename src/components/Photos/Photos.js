import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Photo from "./Photo";
import "./Photos.css";
import { ReactComponent as Before } from "./navigate_before-24px.svg";

function Photos(props) {
  
  const { userId, albumId } = useParams();
  const { photos, title, modal, photo } = props;
  const [isModal, setIsModal] = useState(modal);
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const ref = React.createRef();

  const photoKeyPressHandler = (evt, photo) => {
    if (evt.key === "Enter") {
      photoClickHandler(photo);
      evt.currentTarget.blur();
    }
  };
  const photoClickHandler = (photo) => {
    setCurrentPhoto(photo);
    setIsModal(true);
    changeUrl(photo.id);
  };
  const closePhotoHandler = () => {
    setIsModal(false);
    setCurrentPhoto(null);
    props.history.push(`/users/${userId}/albums/${albumId}/photos`);
  };
  const changeUrl = (id) => {
    props.history.push(`/users/${userId}/albums/${albumId}/photos/${id}`);
  };

  const photosList = photos.map((it) => {
    return (
      <li
        key={it.id}
        ref={ref}
        className="photos_items"
        tabIndex="0"
        onKeyPress={(evt) => photoKeyPressHandler(evt, it)}
      >
        <img
          className="photos_img"
          src={it.thumbnailUrl}
          alt={it.title}
          title={it.title}
          onClick={() => photoClickHandler(it)}
          aria-label="open modal"
        />
      </li>
    );
  });

  return (
    <section className="photos">
      <h2 className="photos_title">{title}</h2>
      <NavLink
        className="photos_link"
        to={{
          pathname: `/users/${userId}/albums`,
        }}
      >
        <Before />
        go to albums
      </NavLink>

      {<ul className="photos_list">{photosList}</ul>}
      {isModal && (
        <Photo
          photo={currentPhoto}
          photos={photos}
          closePhotoHandler={closePhotoHandler}
          changeUrl={changeUrl}
        />
      )}
    </section>
  );
}

export default Photos;
