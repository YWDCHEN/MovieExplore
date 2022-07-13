import React, {useEffect, useState} from 'react';
import {
  Card,
  Typography,
  Box,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3002";

function Home() {
  const [movies, setMovies] = React.useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [movie_id, setMovieID] = useState('');
  const [score, setScore] = useState(4);
  const [email, setEmail] = useState('');
  useEffect(() => {
    fetch(`/api/movies`)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      })
  }, []);
  const renderMovies = () => {
    return movies.map(movie => {
      return (
        <MenuItem key={movie.id} value={movie.movieID}>{movie.name}</MenuItem>
      )
    })
  }
  const handleReview = (e) => {
    e.preventDefault();
    fetch(`/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('token'),
        title: title,
        content,
        movie_id,
        score,
        email
      })
    }).then(res => {
      if (res.status === 200) {
        alert('Success to Review!');
      }
      if (res.status === 500) {
        alert('User not exists!');
      }
    })
  }
  return (
    <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px'}}>
      <Typography variant={'h3'}>Movie Review Application</Typography>
      <Box width={'50%'}>
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
      </Box>
      <form style={{width: '50%'}} onSubmit={handleReview}>
        <TextField required value={email} onChange={e => setEmail(e.target.value)}
                   fullWidth  style={{marginTop: '20px'}} placeholder={'Enter your email'} type={'email'}/>
        <TextField required value={title} onChange={e => setTitle(e.target.value)} fullWidth placeholder={'Enter review title here'} style={{marginTop: '20px'}} />
        <TextField required value={content} onChange={e => setContent(e.target.value)} multiline rows={4} variant={'outlined'} fullWidth placeholder={'Enter review content here'} style={{marginTop: '20px'}} />
        <Box flex={1} marginTop={'30px'} alignItems={'center'}>
          <span>Rating: </span>
          <Rating
            value={score}
            onChange={(e, newVal) => {
              setScore(newVal)
            }}
            name="simple-controlled"
          />
        </Box>
        <Button type={'submit'} style={{marginTop: '40px'}} variant={'contained'} color={'primary'}>Send</Button>
      </form>
    </Container>
  )
}
export default Home;