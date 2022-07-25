import React, {useState} from 'react';
import {Box, Button, Container, List, ListItem,Chip, ListItemText, TextField, Typography} from "@material-ui/core";
import MovieSelector from "../MovieSelector";
import Autocomplete from '@material-ui/lab/Autocomplete';
let timer = null;
function MyPage() {
  const [options, setOptions] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [awards, setAwards] = useState([]);
  const handleInput = async (val) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      let res, data;
      res = await fetch(`https://imdb-api.com/en/API/SearchTitle/k_ds5leuku/${val}`);
      data = await res.json();
      setOptions(data.results);
    }, 1000);
  }
  const handleSearch = async (e, values) => {
    let id = values.id;
    fetch(`https://imdb-api.com/en/API/Trailer/k_ds5leuku/${id}`)
      .then(res => res.json())
      .then(data => {
        setTrailer(data);
        console.log(data)
      })

    fetch(`https://imdb-api.com/en/API/Reviews/k_ds5leuku/${id}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.items);
      });

    fetch(`https://imdb-api.com/en/API/Awards/k_ds5leuku/${id}`)
      .then(res => res.json())
      .then(data => {
        setAwards(data.items);
      })
  }
  const renderTrailer = () => {
    if (trailer) {
      return <iframe width={'100%'} height={'500px'} src={trailer.linkEmbed}></iframe>
    }
  }
  const renderAwards = () => {
    return awards.map(item => {
      return (
        <Chip style={{marginRight: '10px'}} label={`${item.eventTitle}(${item.eventYear})`} color="primary" />
      )
    })
  }
  const renderReviews = () => {
    return (
      <List>
        {reviews.map(review => {
          return (
            <ListItem key={review.title}>
              <ListItemText primary={review.username}
                            secondary={review.content}/>
            </ListItem>
          )
        })}
      </List>
    )
  }
  return (
    <Container>
      <Box width={'100%'}>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          onChange={handleSearch}
          onInputChange={e => handleInput(e.target.value)}
          options={options}
          getOptionLabel={(option) => `${option.title} ${option.description}`}
          renderInput={(params) => <TextField {...params} label="Movie title" variant="outlined" />}
        />
      </Box>
      <Box width={'100%'} overflow={'auto'} height={'80px'} marginTop={'10px'} display={'flex'}>
        {renderAwards()}
      </Box>
      <Box>{renderTrailer()}</Box>
      <Box marginTop={'10px'} maxHeight={'50vh'} overflow={'auto'}>
        {renderReviews()}
      </Box>
    </Container>
  )
}

export default MyPage;