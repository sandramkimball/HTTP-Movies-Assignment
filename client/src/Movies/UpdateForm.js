import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    // const [movies, setMovies] = useState([])

    useEffect(()=> {
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) setMovie(movieToEdit);
    }, [props.movies, props.match.params.id]);

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === 'metascore'){
            value = parseInt(value, 10)
        }

    setMovie({
        ...movie,
        [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            const newMovies = props.movies.map(()=> {
                if(res === props.match.params.id) props.setMovie(newMovies)
            });
            props.history.push('/api/movies');
        })
        .catch(err=> {
            return (
            <p>Please try again.</p>,
            console.log('NOT SUBMITTING:', err.response))})
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <h2>Update Movie</h2>
                <input
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Title'
                value={movie.title}/>

                <input
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='Director'
                value={movie.director}/>

                <input
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='Metascore'
                value={movie.metascore}/>

                <input
                type='text'
                name='stars'
                onChange={handleChange}
                placeholder='Stars'
                value={movie.stars}/>

                <button className='update button'>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;