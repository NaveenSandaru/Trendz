import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { MovieCard } from "../components/movieCard";
import { Popup } from "../components/popup";

import './../styles/homePage.css';

function HomePage() {
    const TMDB_URL = import.meta.env.VITE_TMDB_URL;
    const token = import.meta.env.VITE_API_TOKEN;

    const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortOption, setSortOption] = useState("popularity.desc");

    const { userLoggedIn } = useAuth();

    const trendingRef = useRef(null);

    const getMovies = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: pageNumber,
                sort_by: sortOption,
            });

            if (selectedGenre) {
                params.append("with_genres", selectedGenre);
            }

            const response = await axios.get(`${TMDB_URL}/discover/movie?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });

            const results = response.data.results;

            const filteredResults = searchQuery
                ? results.filter(movie =>
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : results;

            if (pageNumber === 1) {
                setMovies(filteredResults);
            } else {
                setMovies(prev => [...prev, ...filteredResults]);
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setError(error.message);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    const getTrendingMovies = async () => {
        try {
            const response = await axios.get(`${TMDB_URL}/trending/movie/week`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            setTrending(response.data.results);
        } catch (error) {
            console.error("Failed to fetch trending movies:", error);
            setError(error.message);
            setHasError(true);
        }
    };

    const getGenres = async () => {
        try {
            const response = await axios.get(`${TMDB_URL}/genre/movie/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const genreMapping = {};
            response.data.genres.forEach(g => {
                genreMapping[g.id] = g.name;
            });
            setGenreMap(genreMapping);
        } catch (error) {
            console.error("Failed to fetch genres:", error);
            setError(error.message);
            setHasError(true);
        }
    };

    useEffect(() => {
        getGenres();
        getTrendingMovies();
        getMovies(1);
    }, []);

    useEffect(() => {
        setPage(1);
        getMovies(1);
    }, [searchQuery, selectedGenre, sortOption]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        getMovies(nextPage);
    };

    if (!userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="home-page">
            <div className="select-wrapper">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {Object.entries(genreMap).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="popularity.desc">Popularity (High → Low)</option>
                    <option value="vote_average.desc">Rating (High → Low)</option>
                    <option value="release_date.desc">Release Date (Newest)</option>
                    <option value="original_title.asc">Title (A–Z)</option>
                </select>
            </div>

            {!searchQuery && !selectedGenre && (
                <>
                    <Typography variant="h5" className="margin-top-1">Trending Movies</Typography>
                    <div className="trending-wrapper">
                        <button className="scroll-btn left" onClick={() => trendingRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
                            &lt;
                        </button>

                        <div className="trendingCarousel" ref={trendingRef}>
                            {trending.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    title={movie.title}
                                    genres={movie.genre_ids.map(id => genreMap[id] || "Unknown")}
                                    rating={movie.vote_average}
                                />
                            ))}
                        </div>

                        <button className="scroll-btn right" onClick={() => trendingRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
                            &gt;
                        </button>
                    </div>

                </>
            )}


            <Typography variant="h5" className="margin-top-1">All Movies</Typography>
            <div className="moviesGrid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                        genres={movie.genre_ids.map(id => genreMap[id] || "Unknown")}
                        rating={movie.vote_average}
                    />
                ))}
            </div>

            <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
                className="loadmore-button"
            >
                {loading ? "Loading..." : "Load More"}
            </Button>

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
        </div>
    );
}

export default HomePage;
