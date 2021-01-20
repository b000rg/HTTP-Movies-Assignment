import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const history = useHistory();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    const saveMovie = () => {
        props.addToSavedList(movie);
    };

    const deleteMovie = (id) => {
        axios
            .delete(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                props.getMovieList();
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />
            <span className="buttons-wrapper">
                <div className="movie-card-button" onClick={saveMovie}>
                    Save
                </div>
                <div
                    className="movie-card-button"
                    onClick={() => {
                        history.push(`/update-movie/${params.id}`);
                    }}
                >
                    Edit
                </div>
                <div className="movie-card-button" onClick={deleteMovie}>
                    Delete
                </div>
            </span>
        </div>
    );
}

export default Movie;
