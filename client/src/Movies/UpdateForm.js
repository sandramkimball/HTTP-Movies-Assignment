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

    useEffect(()=> {
        const movieToEdit = props.movies.find(
            movie=> `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) setMovie(movieToEdit);
    }, [props.items, props.match.params.id]);

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.title === ''){
            value = parseInt(value, 10)
        }

    setMovie({
        ...movie,
        [ev.target.title]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => console.log('Updated Movies Res:', res));
        props.history.push('/movies');
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
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

                <button className='save-button'>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;