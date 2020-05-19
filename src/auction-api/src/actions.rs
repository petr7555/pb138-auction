use crate::models::{Auction, ReturnAuction, Bid, NewAuction, NewBid, NewUser, User};
use diesel::prelude::*;

pub fn find_user_by_id(
    conn: &PgConnection,
    user_id: i64,
) -> Result<Option<User>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(id.eq(user_id))
        .first::<User>(conn)
        .optional()?;

    Ok(user)
}

pub fn find_auction_by_id(
    conn: &PgConnection,
    auction_id: i64,
) -> Result<Option<ReturnAuction>, diesel::result::Error> {
    use crate::schema::*;

    let auction = auctions::dsl::auctions
        .filter(auctions::id.eq(auction_id))
        .left_join(bids::dsl::bids)
        .inner_join(users::dsl::users)
        .order((bids::amount, bids::created_at))
        .select((auctions::id, auctions::name, auctions::description, users::name, auctions::until, bids::amount.nullable(), bids::user_id.nullable()))
        .first::<ReturnAuction>(conn)
        .optional()?;

    Ok(auction)
}

pub fn find_user_by_name(
    conn: &PgConnection,
    user_name: &str,
) -> Result<Option<User>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(name.eq(user_name))
        .first::<User>(conn)
        .optional()?;

    Ok(user)
}

pub fn insert_new_user(
    conn: &PgConnection,
    new_user: &NewUser,
) -> Result<User, diesel::result::Error> {
    use crate::schema::users::dsl::*;
    //use diesel::dsl::select;
    //use diesel::dsl::exists;
    //let user_exists = select(exists(users.filter(name.eq(&new_user.name)))).get_result(conn);
    //if Ok(true) == user_exists {
    //   return  Err(diesel::result::Error::CustomError);
    //}

    let inserted_user = diesel::insert_into(users)
        .values(new_user)
        .get_result::<User>(conn)?;

    Ok(inserted_user)
}

pub fn find_all_auctions(conn: &PgConnection) -> Result<Vec<ReturnAuction>, diesel::result::Error> {
    use crate::schema::*;

    let auction_vec = auctions::dsl::auctions
        .left_join(bids::dsl::bids)
        .inner_join(users::dsl::users)
        .order((bids::amount, bids::created_at))
        .select((auctions::id, auctions::name, auctions::description, users::name, auctions::until, bids::amount.nullable(), bids::user_id.nullable()))
        .load(conn)?;

    Ok(auction_vec)
}

pub fn insert_new_auction(
    conn: &PgConnection,
    new_auction: &NewAuction,
) -> Result<Auction, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let inserted_auction = diesel::insert_into(auctions)
        .values(new_auction)
        .get_result::<Auction>(conn)?;

    Ok(inserted_auction)
}

pub fn find_auctions_by_user_id(
    conn: &PgConnection,
    user_id: i64,
) -> Result<Vec<ReturnAuction>, diesel::result::Error> {
    use crate::schema::*;

    let user = users::dsl::users.find(user_id).first::<User>(conn)?;
    let auction_vec = auctions::dsl::auctions
        .filter(auctions::user_id.eq(user.id))
        .left_join(bids::dsl::bids)
        .inner_join(users::dsl::users)
        .order((bids::amount, bids::created_at))
        .select((auctions::id, auctions::name, auctions::description, users::name, auctions::until, bids::amount.nullable(), bids::user_id.nullable()))
        .load(conn)?;

    Ok(auction_vec)
}

pub fn insert_new_bid(conn: &PgConnection, new_bid: &NewBid) -> Result<Bid, diesel::result::Error> {
    use crate::schema::*;

    let highest_bid_res = bids::dsl::bids
        .filter(bids::auction_id.eq(new_bid.auction_id))
        .order((bids::amount, bids::created_at))
        .first::<Bid>(conn)
        .optional()?;

    if highest_bid_res.is_some() {
        let highest_bid = highest_bid_res.unwrap();
        if highest_bid.amount >= new_bid.amount {
            return Ok(highest_bid)
        }
    }

    let inserted_bid = diesel::insert_into(bids::dsl::bids)
        .values(new_bid)
        .get_result::<Bid>(conn)?;

    Ok(inserted_bid)
}

pub fn find_auctions_user_taken_part_in(
    conn: &PgConnection,
    searched_user_id: i64,
) -> Result<Vec<Auction>, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;
    use crate::schema::*;
    
    let auction_vec = auctions
    .distinct()
    .select((id, user_id, name, description, until, active, created_at))
    .inner_join(bids::dsl::bids)
    .filter(bids::user_id.eq(searched_user_id))
    .load(conn)?;
    
    Ok(auction_vec)
}
