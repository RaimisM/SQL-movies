SELECT name, strftime('%Y', 'now') - birth AS age FROM people
WHERE birth IS NOT NULL ORDER BY age DESC LIMIT 10;