import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }


  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(res=> {
      this.props.updateMovies(res.data);
      this.props.history.push('/movies');
    }) .catch(err=> console.log('Not deleted:', err.response))
  };


  render() {
    if (!this.state.movie) {
      return <div>Loading Movie...</div>;
    }

    
    // const handleDelete = e => {
    //   e.preventDefault();
    //   axios
    //   .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    //   .then(res=> {
    //     this.props.updateMovies(res.data);
    //     this.props.history.push('/movies');
    //   }) .catch(err=> console.log('Not deleted:', err.response))
    // };

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="save-button" onClick={this.saveMovie}>Save</button>

        <button className='delete-button' onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
