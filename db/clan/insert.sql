INSERT INTO clan (clan_name, sport, player_id)
VALUES ($1, $2, $3)
RETURNING *;
