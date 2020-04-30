CREATE TABLE auctions (
    id BIGINT PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    min_amount BIGINT NOT NULL,
    instant_buyout BIGINT,
    until TIMESTAMP NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
