import React, { useState, useEffect } from "react";
import { api } from "./../../api";
import Preloader from "./../Preloader/Preloader";
import ErrorMessage from "./../Error/ErrorMessage";
import { NavLink } from "react-router-dom";
import "./Albums.css"

function Album(props) {
  const { photos, albumId, title } = props;

  const [isFocus, setIsFocus] = useState(false);
 

const onMouseOver = () => {
setIsFocus(true);
}
const onMouseLeave = () => {
setIsFocus(false);
}

 
    const url = `albums/${albumId}/photos`;
    const photoTitle = title.length > 16 ? `${title.slice(0, 16)}...` : title;
    const fullTitle = isFocus ? title : photoTitle;
    return (
      <li key={albumId} className="albums_item">
        <NavLink className="albums_link"
          to={{
            pathname: url,
            state: {
              currentPhotos: photos,
              currentTitle: title
            }
          }}
        >
          <img className="album_img" src={photos[0].thumbnailUrl} />
          <div className="album_info" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <p className="album_name">{fullTitle}</p>
            <p className="album_count">{photos.length}</p>
          </div>
        </NavLink>
      </li>
    );

}

export default Album;
