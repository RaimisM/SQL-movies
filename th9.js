require('dotenv').config();
const Database = require('better-sqlite3');
const db = new Database('./movies.db');
const favoriteDirector = process.env.DIRECTOR;

if (!favoriteDirector) {
  console.log('The DIRECTOR environment variable is not set.');
  process.exit(1);
}

const query =
`SELECT movies.title, ratings.rating FROM movies
JOIN directors ON movies.id = directors.movie_id
JOIN people ON directors.person_id = people.id
JOIN ratings ON movies.id = ratings.movie_id
WHERE people.name = ? ORDER BY ratings.rating DESC`;

try {
  const rows = db.prepare(query).all(favoriteDirector);
  if (rows.length === 0) {
    console.log(`No movies found for director: ${favoriteDirector}`);
  } else {
    console.log(`Movies for director: ${favoriteDirector}`);
    rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.title} - ${row.rating}`);
    });
  }
} catch (error) {
  console.error(error.message);
} finally {
  db.close();
}