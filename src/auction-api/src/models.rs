use crate::schema::{auctions, bids, users};
use chrono::{DateTime, NaiveDateTime, Utc};
use getset::Getters;
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Serialize, Queryable, Getters)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub id: i64,
    name: String,
    #[getset(get = "pub")]
    password: String,
    active: bool,
    created_at: NaiveDateTime,
}

#[derive(Deserialize, Insertable, Getters, Clone)]
#[serde(rename_all = "camelCase")]
#[table_name = "users"]
pub struct NewUser {
    #[getset(get = "pub")]
    pub name: String,
    #[getset(get = "pub")]
    pub password: String,
}

#[derive(Identifiable, Serialize, Queryable, Associations)]
#[serde(rename_all = "camelCase")]
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
#[serde(rename_all = "camelCase")]
#[table_name = "bids"]
pub struct NewBid {
    pub user_id: i64,
    pub auction_id: i64,
    pub amount: i64,
}

#[derive(Identifiable, Serialize, Queryable, Associations)]
#[serde(rename_all = "camelCase")]
#[belongs_to(User)]
pub struct Auction {
    pub id: i64,
    user_id: i64,
    name: String,
    description: String,
    until: DateTime<Utc>,
    active: bool,
    created_at: NaiveDateTime,
}

#[derive(Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[table_name = "auctions"]
pub struct NewAuction {
    pub name: String,
    pub description: String,
    pub until: DateTime<Utc>,
    pub user_id: i64,
}
