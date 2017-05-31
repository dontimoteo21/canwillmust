INSERT INTO leader_board (player_id, name_first, name_last, sport, team_name, clan_name, points)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
