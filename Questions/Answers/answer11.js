const sqlite3 = require('better-sqlite3');

const args = process.argv.slice(2);
const [title, rating] = args;

if (!title || !rating) {
  console.error('Usage: node updateRating.js "<movie title>" <new rating>');
  process.exit(1);
}

const newRating = parseFloat(rating);
if (isNaN(newRating) || newRating < 0 || newRating > 10) {
  console.error('Error: Rating must be a number between 0 and 10.');
  process.exit(1);
}

const db = sqlite3('../../movies.db');

try {
  const movie = db.prepare('SELECT id FROM movies WHERE title = ?').get(title);
  if (!movie) {
    console.error(`Error: Movie "${title}" not found in the database.`);
    process.exit(1);
  }

  const updateStmt = db.prepare('UPDATE ratings SET rating = ? WHERE movie_id = ?');
  const result = updateStmt.run(newRating, movie.id);

  if (result.changes > 0) {
    console.log(`Success: Updated rating of "${title}" to ${newRating}.`);
  } else {
    console.log(`Warning: No rating was updated. The movie might not have a rating yet.`);
  }
} catch (error) {
  console.error('Database error:', error.message);
} finally {
  db.close();
}
