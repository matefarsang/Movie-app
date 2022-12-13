import axios from "axios";

const BASE_URL = "http://localhost:3001";

// all movies
export const getMovies = async (ageLimit) => {
  try {
    const response = await axios.get(`${BASE_URL}/movies`, {
      params: { ageLimit },
    });
    const moviesData = response.data;

    return moviesData;
  } catch (error) {
    return console.log(error);
  }
};

// single movie
export const getMovie = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`);
    const movieData = response.data;

    return movieData;
  } catch (error) {
    return console.log(error);
  }
};

// posting a new movie
export const addMovie = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/movie`, formData);
    const newMovie = response.data;

    return newMovie;
  } catch (error) {
    return console.log(error);
  }
};

// update a movie
export const updateMovie = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/movie/${id}`, formData);
    const updatedMovie = response.data;

    return updatedMovie;
  } catch (error) {
    return console.log(error);
  }
};

// delete a movie
export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/movie/${id}`);
    const deletedMovie = response.data;

    return deletedMovie;
  } catch (error) {
    return console.log(error);
  }
};
