-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS secrets CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE secrets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO 
secrets (title, description)
VALUES
('secret1', 'i am thing 1')
('secret2', 'i am thing 2')