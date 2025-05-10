# Trendz - Movie Discovery Platform

**Trendz** is a movie discovery platform that allows users to view trending movies, explore detailed information, and watch trailers. The platform fetches movie data from the TMDB (The Movie Database) API.

## Features

- **Firebase Authentication:** Users can log into the system with their email address or through a google login, managed by firebase.
- **Trending Movies:** Displays the most popular and trending movies.
- **All Movies:** Displays All movies fetched by TMDB API.
- **Search:** Users can seacrh for movies by the title.
- **Filter:** Users can filter movies by the genre.
- **Sort:** Users can sort movies by the release date, title in ascending or descending order.
- **Movie Cards:** Each movie is represented with a card showing basic information (e.g., title, poster).
- **Movie Details Page:** When a movie card is clicked, the user is redirected to a detailed page containing:
  - Movie synopsis
  - Release date
  - Genre
  - Rating
  - Trailer embedded from TMDB
- **Responsive UI:** Optimized for both mobile and desktop views.
- **Supports light and dark theme:** Users can switch between light theme and dark theme.

## Tech Stack

- **Frontend:** React.js
- **API:** TMDB API for movie data
- **Styling:** CSS

## Setup

### Prerequisites

- Node.js (version 14.x or higher)
- NPM

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NaveenSandaru/trendz.git

2. Navigate to project directory:

   ```bash
   cd trendz
3. Install dependencies:

   ```bash
   npm install
4. Start the development server:

   ```bash
   npm run dev
## API Usage

The **Trendz** platform interacts with the TMDB API to fetch trending movies and movie details. The following API endpoints are used:

### Fetch Trending Movies

- **Endpoint:** `/trending/movie/week`
- **Method:** `GET`
  
### Fetch Movie Details

- **Endpoint:** `/movie/{movie_id}`
- **Method:** `GET`

### Fetch Movie Trailers

- **Endpoint:** `/movie/{movie_id}/videos`
- **Method:** `GET`

Refer to the [TMDB API documentation](https://www.themoviedb.org/documentation/api) for more details.

## Features Implemented

1. **Firebase Authentication:**
   - Users can log into the system with their email address or through Google login, managed by Firebase.

2. **Trending Movies:**
   - The homepage displays the most popular and trending movies fetched from the TMDB API.

3. **All Movies Display:**
   - All movies fetched by the TMDB API are displayed with basic information such as title, poster, and rating.

4. **Search Functionality:**
   - Users can search for movies by title.

5. **Filter by Genre:**
   - Users can filter movies by genre.

6. **Sort Movies:**
   - Users can sort movies by release date, title, or rating in ascending or descending order.

7. **Movie Cards:**
   - Each movie is represented with a card displaying key details (e.g., title, poster, rating, and genre).

8. **Movie Detail Page:**
   - Clicking on a movie card redirects the user to a detailed page containing:
     - Movie synopsis
     - Release date
     - Genre
     - Rating
     - Trailer embedded from TMDB

9. **Responsive Design:**
   - The platform is optimized for both mobile and desktop views, offering a seamless experience across devices.

10. **Supports Light and Dark Theme:**
    - Users can switch between a light theme and a dark theme for a personalized viewing experience.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


