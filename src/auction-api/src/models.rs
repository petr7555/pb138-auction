use serde::{Serialize, Deserialize};
use crate::schema::{users, bids, auctions};
use chrono::{DateTime, Utc, NaiveDateTime};
use getset::Getters;

#[derive(Serialize, Queryable, Getters)]
pub struct FullUser {
    id: i64,
    name: String,
    #[getset(get = "pub")]
    password: String,
    active: bool,
    created_at: NaiveDateTime,
}

#[derive(Deserialize, Insertable, Getters, Clone)]
#[table_name = "users"]
pub struct User {
    #[getset(get = "pub")]
    name: String,
    #[getset(get = "pub")]
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
    created_at: NaiveDateTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "bids"]
pub struct NewBid {
    user_id: i64,
    auction_id: i64,
    amount: i64,
}

#[derive(Serialize, Queryable, Associations)]
#[belongs_to(User)]
pub struct Auction {
    id: i64,
    user_id: i64,
    name: String,
    description: String,
    until: DateTime<Utc>,
    active: bool,
    created_at: NaiveDateTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "auctions"]
pub struct NewAuction {
    name: String,
    description: String,
    until: DateTime<Utc>,
}
