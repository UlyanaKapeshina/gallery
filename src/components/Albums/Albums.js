import React from "react";
import { NavLink } from "react-router-dom";
import "./Albums.css";
import { ReactComponent as Before } from "./../Photos/navigate_before-24px.svg";
import AlbumContainer from "./AlbumContainer";
import PropTypes from 'prop-types';

function Albums(props) {
  const { albums, user } = props;
  const albumsList = albums.map((it) => {
    return <AlbumContainer albumId={it.id} title={it.title} key={it.id}/>;
  });
  return (
    <section className="albums">
      <h2>{user.name}</h2>
      <NavLink
        className="albums_back-link"
        to={{
          pathname: `/users`,
        }}
      >
        <Before />
        go to users
      </NavLink>
      {<ul className="albums_list">{albumsList}</ul>}
    </section>
  );
}

export default Albums;

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired, 
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired
};