CREATE TABLE IF NOT EXISTS player (
    player_id serial PRIMARY KEY,
    name_first text,
    name_last text,
    email text UNIQUE,
    sport text,
    team_name text,
    clan_name text
);

CREATE TABLE IF NOT EXISTS coach (
    coach_id serial PRIMARY KEY,
    name_first text,
    name_last text,
    email text UNIQUE,
    sport text,
    team_name text
);

CREATE TABLE IF NOT EXISTS team (
    team_id serial PRIMARY KEY,
    team_name text,
    mascot_name text,
    coach_name text
);

CREATE TABLE IF NOT EXISTS clan (
    clan_id serial PRIMARY KEY,
    clan_name text,
    sport text,
    player_id integer
);

CREATE TABLE IF NOT EXISTS training (
    training_id serial PRIMARY KEY,
    tain_name text,
    reps integer,
    duration integer,
    sport text,
    player_id integer
);

CREATE TABLE IF NOT EXISTS leader_board (
    leaders_id serial PRIMARY KEY,
    name_first text,
    name_last text,
    sport text,
    team_name text,
    clan_name text,
    points integer
);

