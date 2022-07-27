import React, {useEffect} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

function MovieSelector({onSelect}) {
  const [movies, setMovies] = React.useState([]);
  const [movie_id, setMovieID] = React.useState('');
  useEffect(() => {
    const movie = movies.find(item => item.id === movie_id);
    if (movie) {
      onSelect && onSelect(movie.name);
    }
    }, [movie_id]);
  React.useEffect(() => {
    fetch(`/api/movies`)
      .then(res => res.json())
      .then(data => {
        let temp_movies = [];
        let temp_map = {};
        for (let item of data) {
          if (!temp_map[item.name]) {
            temp_movies.push(item);
            temp_map[item.name] = true;
          }
        }
        setMovies(temp_movies);
      })
  }, []);
  const renderMovies = () => {
    return movies.map(movie => {
      return (
        <MenuItem key={movie.name} value={movie.movieID}>{movie.name}</MenuItem>
      )
    })
  }
  return (
    <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Select a movie</InputLabel>
      <Select
        required
        value={movie_id}
        onChange={e => {
          setMovieID(e.target.value)
        }}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Age"
      >
        {renderMovies()}
      </Select>
    </FormControl>
  )
}

export default MovieSelector;