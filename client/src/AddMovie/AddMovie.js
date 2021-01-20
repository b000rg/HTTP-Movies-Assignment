import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddMovie = (props) => {
    const history = useHistory();
    const [movieDetails, setMovieDetails] = useState({
        title: "",
        director: "",
        metascore: 100,
        stars: [],
    });

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
            .post("http://localhost:5000/api/movies", movieDetails)
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
                    <Card.Title>Add Movie</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="addMovie.title">
                            <Form.Label htmlFor="title">Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={movieDetails.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="addMovie.director">
                            <Form.Label htmlFor="director">
                                Director:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="director"
                                value={movieDetails.director}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="addMovie.metascore">
                            <Form.Label htmlFor="metascore">
                                Metascore:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                name="metascore"
                                value={movieDetails.metascore || 1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="addMovie.stars">
                            <Form.Label htmlFor="stars">Stars:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="stars"
                                value={movieDetails.stars.join(", ")}
                                onChange={handleChange}
                            />
                            <Form.Text>
                                (comma separated list, e.g. "Brad Pitt, Bradley
                                Cooper, ...")
                            </Form.Text>
                        </Form.Group>
                        <Button>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddMovie;
