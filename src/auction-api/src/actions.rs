use diesel::prelude::*;
use crate::models;
use crate::models::{User, FullUser, NewAuction, Auction};

pub fn find_user_by_id(user_id: i64, conn: &PgConnection)
-> Result<Option<models::FullUser>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(id.eq(user_id))
        .first::<models::FullUser>(conn)
        .optional()?;

    Ok(user)
}

pub fn find_auction_by_id(auction_id: i64, conn: &PgConnection)
-> Result<Option<models::Auction>, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let auction = auctions
        .filter(id.eq(auction_id))
        .first::<models::Auction>(conn)
        .optional()?;

    Ok(auction)
}

pub fn find_user_by_name(user_name: &str, conn: &PgConnection)
-> Result<Option<models::FullUser>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(name.eq(user_name))
        .first::<models::FullUser>(conn)
        .optional()?;
    
    Ok(user)
}

pub fn insert_new_user(new_user: &User, conn: &PgConnection)
->  Result<models::FullUser, diesel::result::Error> {
    use crate::schema::users::dsl::*;
    //use diesel::dsl::select;
    //use diesel::dsl::exists;
    //let user_exists = select(exists(users.filter(name.eq(&new_user.name)))).get_result(conn);
    //if Ok(true) == user_exists {
    //   return  Err(diesel::result::Error::CustomError);
    //}
                
    let inserted_user = diesel::insert_into(users)
        .values(new_user)
        .get_result::<FullUser>(conn)?;

    Ok(inserted_user)
}

pub fn find_all_auctions(conn: &PgConnection) -> Result<Vec<Auction>, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let auction_vec = auctions.load(conn)?;

    Ok(auction_vec)
}

pub fn insert_new_auction(new_auction: &NewAuction, conn: &PgConnection)
-> Result<models::Auction, diesel::result::Error> {
    use crate::schema::auctions::dsl::*;

    let inserted_auction = diesel::insert_into(auctions)
    .values(new_auction)
    .get_result::<Auction>(conn)?;

    Ok(inserted_auction)
}