INSERT INTO coach (name_first, name_last, email, sport, team_name)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
