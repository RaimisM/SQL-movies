const sqlite3 = require('better-sqlite3');

const year = process.argv[2];

if (!year || isNaN(year)) {
    console.error('Please provide a valid year.');
    process.exit(1);
}

const db = sqlite3('../../movies.db');

async function getTopMovies(year) {
    try {
        const query = `
            SELECT m.title, r.rating
            FROM movies m
            JOIN ratings r ON m.id = r.movie_id
            WHERE m.year = ?
            ORDER BY r.rating DESC
            LIMIT 10;
        `;

        const rows = db.prepare(query).all(year);

        if (rows.length > 0) {
            console.log(`Top 10 highest-rated movies from ${year}:`);
            rows.forEach((movie, index) => {
                console.log(`${index + 1}. ${movie.title} - Rating: ${movie.rating}`);
            });
        } else {
            console.log(`No movies found for the year ${year}.`);
        }
    } catch (err) {
        console.error('Error fetching movies:', err);
    } finally {
        db.close();
    }
}

getTopMovies(year);
