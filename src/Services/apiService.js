import axios from "axios";

const API_BASE_URL = "http://localhost:5055";

export const fetchMovies = () => axios.get(`${API_BASE_URL}/movies`);
export const fetchFunctions = (movieId) => {
  return axios.get(`${API_BASE_URL}/movies/${movieId}/functions`);
};
export const fetchDirectors = () => axios.get(`${API_BASE_URL}/directors`);
export const addFunction = (newFunction) =>
  axios.post(`${API_BASE_URL}/functions`, newFunction);
export const updateFunction = (id, updatedFunction) =>
    axios.put(`${API_BASE_URL}/functions/${id}`, updatedFunction);  
export const deleteFunction = (id) =>
  axios.delete(`${API_BASE_URL}/functions/${id}`);
export const fetchDirectorByMovieId = (movieId) =>
  axios.get(`${API_BASE_URL}/movies/${movieId}/director`);
