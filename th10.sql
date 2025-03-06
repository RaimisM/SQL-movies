INSERT INTO ratings (movie_id, rating, votes)
SELECT id, 8.9, 0 FROM movies WHERE title = 'Oppenheimer' AND year = 2023;