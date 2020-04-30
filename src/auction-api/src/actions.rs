use diesel::prelude::*;
use crate::models;
use crate::models::{NewUser, User};

pub fn find_user_by_id(user_id: i64, conn: &PgConnection)
                       -> Result<Option<models::User>, diesel::result::Error> {
    use crate::schema::users::dsl::*;

    let user = users
        .filter(id.eq(user_id))
        .first::<models::User>(conn)
        .optional()?;

    Ok(user)
}

pub fn insert_new_user(new_user: &NewUser, conn: &PgConnection)
                       ->  Result<models::User, diesel::result::Error> {
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