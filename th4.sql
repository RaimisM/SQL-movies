SELECT COUNT(movie_id) FROM directors WHERE person_id IN (SELECT id FROM people WHERE name = 'Martin Scorsese');