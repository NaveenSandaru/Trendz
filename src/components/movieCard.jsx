import React from "react";
import { useNavigate } from "react-router-dom";
import './../styles/movieCard.css';

export function MovieCard({ id, poster, title, genres, rating }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="movieCard" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="posterSection">
                <img src={poster} alt={`${title} Poster`} className="moviePoster" />
            </div>

            <div className="infoSection">
                <h3 className="title">{title}</h3>

                <div className="genresSection">
                    {genres.map((genre, index) => (
                        <span key={index} className="genre">
                            {genre}
                        </span>
                    ))}
                </div>

                {rating !== undefined && (
                    <div className="ratingSection">
                        <span className="rating">⭐ {rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
