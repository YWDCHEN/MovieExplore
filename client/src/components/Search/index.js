import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  List,
  ListSubheader, ListItem
} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
function Search() {
  const [movies, setMovies] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [actor, setActor] = React.useState('');
  const [director, setDirector] = React.useState('');
  const handleSearch = async () => {
    fetch(`/api/movies/search?title=${title}&actor_name=${actor}&director_name=${director}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMovies(data);
      })
  }

  const renderMovies = () => {
    return movies.map(movie => {
      return (
        <Card key={movie.movie_id} style={{padding: '10px', marginTop: '20px'}}>
          <Typography variant={'h5'}>{movie.title}</Typography>
          <CardContent>
            <Typography variant={'h6'}>Directors</Typography>
            <List
              component={'nav'}>
              {movie.directors.map(item => {
                if (item.first_name) {
                  return (
                    <ListItem button>
                      {item.first_name}·{item.last_name}
                    </ListItem>
                  )
                }
              })}
            </List>
            <Typography variant={'h6'}>Reviews</Typography>
            {movie.reviews.map(item => {
              if (item.reviewTitle) {
                return (
                  <div>
                    <h5 style={{display: 'flex', alignItems: 'center', margin: 0}}>
                      {item.reviewTitle}
                      <p style={{color: 'orangered'}}>
                        <StarIcon />
                        {item.reviewScore}
                      </p>
                    </h5>
                    <pre>{item.reviewContent}</pre>
                  </div>
                )
              }
            })}
          </CardContent>
        </Card>
      )
    })
  }

  return (
    <Container>
      <Typography variant={'h3'} style={{textAlign: 'center'}}>Search</Typography>
      <Box display={'flex'} >
        <Box width={'50%'} margin={'auto'} marginRight={'10px'}>
          <Typography variant={'h5'}>Title</Typography>
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            variant={'outlined'}
            size={'small'} fullWidth placeholder={'Enter movie title'}/>
        </Box>
        <Box width={'50%'} margin={'auto'} marginRight={'10px'}>
          <Typography variant={'h5'}>Actor fullname</Typography>
          <TextField variant={'outlined'}
                     value={actor}
                     onChange={e => setActor(e.target.value)}
                     fullWidth
                     size={'small'}
                     placeholder={'Enter actor firstname + lastname'}/>
        </Box>
        <Box width={'50%'} margin={'auto'} marginRight={'10px'}>
          <Typography variant={'h5'}>Director fullname</Typography>
          <TextField variant={'outlined'}
                     fullWidth
                     value={director}
                     onChange={e => setDirector(e.target.value)}
                     size={'small'}
                     placeholder={'Enter director firstname + lastname'}/>
        </Box>
      </Box>
      <Box width={'50%'}
           height={'100%'}
           marginTop={'10px'}
           display={'flex'}>
        <Button variant={'contained'}
                onClick={handleSearch}
                color={'primary'}>Search</Button>
      </Box>
      <Box marginTop={'20px'} maxHeight={'70vh'} overflow={'auto'} padding={'10px'}>
        {renderMovies()}
      </Box>
    </Container>
  )
}
export default Search;