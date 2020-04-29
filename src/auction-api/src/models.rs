use std::time::SystemTime;
use chrono::naive::NaiveDateTime;
use serde::{Serialize, Deserialize};
use super::schema::{users, bids, auctions};

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
pub struct NewUser<'a> {
    name: &'a str,
    password: &'a str,
    active: bool,
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
    active: bool,
}

#[derive(Serialize, Queryable)]
pub struct Auction {
    id: i64,
    name: String,
    description: String,
    min_amount: i64,
    instant_buyout: Option<i64>,
    until: NaiveDateTime,
    active: bool,
    created_at: SystemTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "auctions"]
pub struct NewAuction<'a> {
    name: &'a str,
    description: &'a str,
    min_amount: i64,
    instant_buyout: Option<i64>,
    until: NaiveDateTime,
    active: bool,
}
