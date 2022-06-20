import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Review />
            </div>
        )
    }

}

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMovie: "",
            enteredTitle: "",
            enteredReview: "",
            selectedRating: 0,
            open1: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false
        }
        this.updateSelectedMovie = this.updateSelectedMovie.bind(this)
        this.updateEnteredTitle = this.updateEnteredTitle.bind(this)
        this.updateEnteredReview = this.updateEnteredReview.bind(this)
        this.updateSelectedRating = this.updateSelectedRating.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose1 = this.handleClose1.bind(this)
        this.handleClose2 = this.handleClose2.bind(this)
        this.handleClose3 = this.handleClose3.bind(this)
        this.handleClose4 = this.handleClose4.bind(this)
        this.handleClose5 = this.handleClose5.bind(this)
    }

    componentDidMount() {
    }

    updateSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        })
    }

    updateEnteredTitle(title) {
        this.setState({
            enteredTitle: title
        })
    }

    updateEnteredReview(review) {
        this.setState({
            enteredReview: review
        })
    }

    updateSelectedRating(rating) {
        this.setState({
            selectedRating: rating
        })
    }

    handleSubmit() {
        console.log(this.state)
        if (!this.state.selectedMovie || this.state.selectedMovie === "") {
            this.setState({
                open1: true
            })
        } else if (!this.state.enteredTitle || this.state.enteredTitle === "") {
            this.setState({
                open2: true
            })
        } else if (!this.state.enteredReview || this.state.enteredReview === "") {
            this.setState({
                open3: true
            })
        } else if (!this.state.selectedRating || this.state.selectedRating === "") {
            this.setState({
                open4: true
            })
        } else {
            this.setState({
                open5: true
            })
        }
    }

    handleClose1() {
        this.setState({
            open1: false
        })
    }

    handleClose2() {
        this.setState({
            open2: false
        })
    }

    handleClose3() {
        this.setState({
            open3: false
        })
    }

    handleClose4() {
        this.setState({
            open4: false
        })
    }

    handleClose5() {
        this.setState({
            open5: false
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            Movie Review Application
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <MovieSelection updateSelectedMovie={this.updateSelectedMovie} />
                        <ReviewTitle updateEnteredTitle={this.updateEnteredTitle} />
                        <ReviewBody updateEnteredReview={this.updateEnteredReview} />
                        <ReviewRating updateSelectedRating={this.updateSelectedRating} />
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.open1} autoHideDuration={6000} onClose={this.handleClose1} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.handleClose1} severity="error">
                        Please select a movie!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.open2} autoHideDuration={6000} onClose={this.handleClose2} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.handleClose2} severity="error">
                        Please enter your review title!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.open3} autoHideDuration={6000} onClose={this.handleClose3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.handleClose3} severity="error">
                        Please enter your review!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.open4} autoHideDuration={6000} onClose={this.handleClose4} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.handleClose4} severity="error">
                        Please select the rating!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.open5} autoHideDuration={6000} onClose={this.handleClose5} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.handleClose5} severity="success">
                        Your review has been received!<br/>
                        {this.state.selectedMovie}<br/>
                        {this.state.enteredTitle}<br/>
                        {this.state.enteredReview}<br/>
                        {this.state.selectedRating}<br/>
                    </Alert>
                </Snackbar>
            </div>
        )
    }

}

class MovieSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMovie: ""
        }
        this.handleSelectMovie = this.handleSelectMovie.bind(this)
    }

    componentDidMount() {
    }

    handleSelectMovie(e) {
        console.log(e)
        this.setState({
            selectedMovie: e.target.value
        })
        this.props.updateSelectedMovie(e.target.value);
    }

    render() {
        return (
            <div>
                <FormControl variant="outlined">
                    <InputLabel id="movie-title-select-label">Select a movie</InputLabel>
                    <Select
                        labelId="movie-title-select-label"
                        id="movie-title-select"
                        value={this.state.selectedMovie}
                        onChange={this.handleSelectMovie}
                        style={{ width: '180px' }}
                        label="Select Movie Title"
                    >
                        <MenuItem value={"Forrest Gump"}>Forrest Gump</MenuItem>
                        <MenuItem value={"12 Angry Men"}>12 Angry Men</MenuItem>
                        <MenuItem value={"Pulp Fiction"}>Pulp Fiction</MenuItem>
                        <MenuItem value={"Fight Club"}>Fight Club</MenuItem>
                        <MenuItem value={"Inception"}>Inception</MenuItem>
                    </Select>
                </FormControl>

            </div>
        )
    }

}

class ReviewTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredTitle: ""
        }
        this.handleInputTitle = this.handleInputTitle.bind(this)
    }

    componentDidMount() {
    }

    handleInputTitle(e) {
        this.setState({
            enteredTitle: e.target.value
        })
        this.props.updateEnteredTitle(e.target.value)
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <InputLabel id="review-title-label">Input the title</InputLabel>
                <TextField required id="reviewtitle" label="Input the title" variant="outlined" value={this.state.enteredTitle} onChange={this.handleInputTitle} />
            </div>
        )
    }

}

class ReviewBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredReview: ""
        }
        this.handleInputContent = this.handleInputContent.bind(this)
    }

    componentDidMount() {
    }

    handleInputContent(e) {
        this.setState({
            enteredReview: e.target.value
        })
        this.props.updateEnteredReview(e.target.value)
    }

    render() {
        return (
            <div>
                <InputLabel id="review-content-label">Input the review content</InputLabel>
                <TextField
                    id="standard-multiline-static"
                    label="Input the review content"
                    multiline
                    rows={3}
                    style={{ width: '240px' }}
                    variant="outlined"
                    value={this.state.enteredReview}
                    onChange={this.handleInputContent}
                />
            </div>
        )
    }

}

class ReviewRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRating: '0'
        }
        this.handleSelectRating = this.handleSelectRating.bind(this)
    }

    componentDidMount() {
    }

    handleSelectRating(e) {
        this.setState({
            selectedRating: e.target.value
        })
        this.props.updateSelectedRating(e.target.value)
    }

    render() {
        return (
            <div>
                <FormControl variant="outlined" style={{ marginTop: '20px' }}>
                    <FormLabel component="legend">Rate the movie</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={this.handleSelectRating} value={this.state.selectedRating}>
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="1"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="2"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="3"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="4"
                            control={<Radio color="primary" />}
                            label="4"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio color="primary" />}
                            label="5"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

}

export default Home;