INSERT INTO user (name_first, name_last, email, sport, team_name, clan_name)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
