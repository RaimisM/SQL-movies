SELECT SUBSTR(title, 1, 1) AS first_letter, ROUND(AVG(ratings.rating), 1) AS avg_rating
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE SUBSTR(title, 1, 1) GLOB '[A-Z]'
GROUP BY first_letter ORDER BY first_letter;