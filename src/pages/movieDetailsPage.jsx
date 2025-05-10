import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box, Link } from "@mui/material";
import { Popup } from "../components/popup";

import './../styles/MovieDetailsPage.css';

function MovieDetails() {
    const { id } = useParams();
    const TMDB_URL = import.meta.env.VITE_TMDB_URL;
    const token = import.meta.env.VITE_API_TOKEN;

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const getMovieDetails = async () => {
        try {
            const [detailsRes, videosRes] = await Promise.all([
                axios.get(`${TMDB_URL}/movie/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }),
                axios.get(`${TMDB_URL}/movie/${id}/videos`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                })
            ]);

            setMovie(detailsRes.data);

            const trailer = videosRes.data.results.find(
                v => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) setTrailerKey(trailer.key);
        } catch (error) {
            console.error("Failed to fetch movie details or trailer:", error);
            setError(error.message);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!movie) return <Typography variant="h6">Movie not found</Typography>;

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: "0 auto" }} className="movieDetailsPage">
            <Typography variant="h4" className="movieTitle" gutterBottom>
                {movie.title}
            </Typography>

            {movie.tagline && (
                <Typography variant="subtitle1" className="movieTagline" gutterBottom>
                    {movie.tagline}
                </Typography>
            )}

            <Box className="movieDetailsContent">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="moviePoster"
                />

                <Box className="movieInfoCard">
                    <Typography variant="body1" paragraph>{movie.overview}</Typography>
                    <Box className="movieMeta">
                        <Typography variant="body2">🎬 Genres: {movie.genres.map(g => g.name).join(", ")}</Typography>
                        <Typography variant="body2">⏱️ Runtime: {movie.runtime} mins</Typography>
                        <Typography variant="body2">📅 Released: {movie.release_date}</Typography>
                        <Typography variant="body2">⭐ Rating: {movie.vote_average} / 10 ({movie.vote_count} votes)</Typography>
                        <Typography variant="body2">💰 Budget: ${movie.budget.toLocaleString()}</Typography>
                        <Typography variant="body2">💵 Revenue: ${movie.revenue.toLocaleString()}</Typography>
                        <Typography variant="body2">🏢 Studios: {movie.production_companies.map(c => c.name).join(", ") || "N/A"}</Typography>
                        <Typography variant="body2">🗣️ Languages: {movie.spoken_languages.map(l => l.english_name).join(", ")}</Typography>
                    </Box>
                    {movie.homepage && (
                        <Box mt={2}>
                            <Link href={movie.homepage} target="_blank" rel="noopener" className="watchNowLink">
                                ▶️ Watch on Official Site
                            </Link>
                        </Box>
                    )}
                </Box>
            </Box>

            {trailerKey && (
                <Box className="movieTrailerContainer">
                    <Typography variant="h6" className="trailerHeading">Trailer</Typography>
                    <Box className="movieTrailerBox">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="movieTrailer"
                        ></iframe>
                    </Box>
                </Box>
            )}
            {hasError && (
                <Popup
                    type="error"
                    heading="API Error"
                    message={error}
                    onClose={() => {
                        setShowPopup(false);
                        setError('');
                        setHasError(false);
                    }}
                />
            )}
        </Box>

    );

}

export default MovieDetails;
