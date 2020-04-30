use std::time::SystemTime;
use serde::{Serialize, Deserialize};
use super::schema::{users, bids, auctions};
use chrono::{DateTime, Utc};

#[derive(Serialize, Queryable)]
pub struct User {
    id: i64,
    name: String,
    password: String,
    active: bool,
    created_at: SystemTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "users"]
pub struct NewUser {
    name: String,
    password: String,
}

#[derive(Serialize, Queryable, Associations)]
#[belongs_to(User)]
#[belongs_to(Auction)]
pub struct Bid {
    id: i64,
    user_id: i64,
    auction_id: i64,
    amount: i64,
    active: bool,
    created_at: SystemTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "bids"]
pub struct NewBid {
    user_id: i64,
    auction_id: i64,
    amount: i64,
}

#[derive(Serialize, Queryable)]
pub struct Auction {
    id: i64,
    name: String,
    description: String,
    until: DateTime<Utc>,
    active: bool,
    created_at: SystemTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "auctions"]
pub struct NewAuction {
    name: String,
    description: String,
    until: DateTime<Utc>,
}
