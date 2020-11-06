import Axios from "axios";
const instance = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000
});

export const api = {
 
  getUsers() {

    return instance.get(`users`).then(response => response.data);
  },
  getUser(id) {

    return instance.get(`users/${id}`).then(response => response.data);
  },
  getAlbums(userId = 1) {
    return instance.get(`users/${userId}/albums`).then(response => response.data);
  },
  getPhotos(albumId) {
    return instance.get(`albums/${albumId}/photos`).then(response => response.data);
   
  },
  getAlbum(albumId) {
    return instance.get(`albums/${albumId}`).then(response => response.data);
   
  },
 
  getPhoto(id) {
    return instance.get(`photos/${id}`).then(response => response.data);
  },

};
