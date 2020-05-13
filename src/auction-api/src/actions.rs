use crate::models;
use crate::models::{Auction, User, NewAuction, NewUser};
use diesel::prelude::*;

pub fn find_user_by_id(
    conn: &PgConnection,
    user_id: i64,
) -> Result<Option<models::User>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(id.eq(user_id))
        .first::<models::User>(conn)
        .optional()?;

    Ok(user)
}

pub fn find_auction_by_id(
    conn: &PgConnection,
    auction_id: i64,
) -> Result<Option<models::Auction>, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let auction = auctions
        .filter(id.eq(auction_id))
        .first::<models::Auction>(conn)
        .optional()?;

    Ok(auction)
}

pub fn find_user_by_name(
    conn: &PgConnection,
    user_name: &str,
) -> Result<Option<models::User>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(name.eq(user_name))
        .first::<models::User>(conn)
        .optional()?;

    Ok(user)
}

pub fn insert_new_user(
    conn: &PgConnection,
    new_user: &NewUser,
) -> Result<models::User, diesel::result::Error> {
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

pub fn find_all_auctions(conn: &PgConnection) -> Result<Vec<Auction>, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let auction_vec = auctions.load(conn)?;

    Ok(auction_vec)
}

pub fn insert_new_auction(
    conn: &PgConnection,
    new_auction: &NewAuction,
) -> Result<models::Auction, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let inserted_auction = diesel::insert_into(auctions)
        .values(new_auction)
        .get_result::<Auction>(conn)?;

    Ok(inserted_auction)
}

pub fn find_auctions_by_user_id(
    conn: &PgConnection,
    user_id: i64,
) -> Result<Vec<Auction>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users.find(user_id).first::<models::User>(conn)?;
    let auction_vec = models::Auction::belonging_to(&user).load(conn)?;

    Ok(auction_vec)
}
