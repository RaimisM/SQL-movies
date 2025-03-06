SELECT people.name, COUNT(stars.movie_id) FROM stars
JOIN people ON stars.person_id = people.id
GROUP BY people.name HAVING COUNT(stars.movie_id) >= 300
ORDER BY COUNT(movie_id);