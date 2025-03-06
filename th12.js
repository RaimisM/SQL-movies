const Database = require('better-sqlite3');

const args = process.argv.slice(2);
const [title, year] = args;

if (!title || !year) {
  console.error('Please provide a movie title and year.');
  process.exit(1);
}

if (isNaN(year)) {
  console.error('Year must be a number.');
  process.exit(1);
}

const db = new Database('./movies.db');

try {
  const insertMovie = db.transaction(() => {
    const checkMovie = db.prepare('SELECT id FROM movies WHERE title = ? AND year = ?').get(title, year);
    if (checkMovie) {
      throw new Error('Movie already exists in the database.');
    }

    const addMovie = db.prepare('INSERT INTO movies (title, year) VALUES (?, ?)').run(title, year);

    if (!addMovie.changes) {
      throw new Error('Failed to add movie to the database.');
    }

    console.log('Movie added to the database with ID:', addMovie.lastInsertRowid);
  });

  insertMovie();
} catch (error) {
  console.error(error.message);
} finally {
  db.close();
}
