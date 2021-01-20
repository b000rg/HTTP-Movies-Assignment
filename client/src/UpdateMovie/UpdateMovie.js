import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateMovie = (props) => {
    const params = useParams();
    const history = useHistory();
    const [movieDetails, setMovieDetails] = useState({});

    // Get movie details
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                setMovieDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.id]);

    const handleChange = (evt) => {
        switch (evt.target.name) {
            case "metascore":
                setMovieDetails({
                    ...movieDetails,
                    metascore: parseInt(evt.target.value),
                });
                break;
            case "stars":
                setMovieDetails({
                    ...movieDetails,
                    stars: evt.target.value.split(", "),
                });
                break;
            default:
                setMovieDetails({
                    ...movieDetails,
                    [evt.target.name]: evt.target.value,
                });
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.persist();
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movieDetails)
            .then((res) => {
                props.getMovieList();
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container as="div">
            <Card>
                <Card.Header>
                    <Card.Title>Edit Movie Details</Card.Title>
                </Card.Header>
                <Card.Body>
                    {movieDetails.id > -1 && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="updateMovie.title">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={movieDetails.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="updateMovie.director">
                                <Form.Label>Director:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="director"
                                    value={movieDetails.director}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="updateMovie.metascore">
                                <Form.Label>Metascore:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="100"
                                    name="metascore"
                                    value={movieDetails.metascore || 1}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="updateMovie.stars">
                                <Form.Label>Stars:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="stars"
                                    value={movieDetails.stars.join(", ")}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button>Submit</Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateMovie;
