use actix_web::{
    web, HttpResponse, post,
    error::BlockingError,
};
use diesel::{PgConnection, r2d2};
use diesel::r2d2::ConnectionManager;
use crate::response::SuccessResponse;
use crate::models::{User, Auction, NewAuction};

use diesel::result::Error::DatabaseError;
use diesel::result::DatabaseErrorKind::UniqueViolation;

use crate::actions;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[post("/register")]
pub async fn register_user(pool: web::Data<DbPool>, form: web::Json<User>)
-> Result<HttpResponse, actix_web::Error> {
    let conn = pool.get()
    .map_err(|e| {
        eprintln!("{}", e);
        HttpResponse::InternalServerError().finish()
    })?;

    let new_user = form.into_inner();

    let res = web::block(move || actions::insert_new_user(&new_user, &conn)).await;
    match res {
        Ok(_) => Ok(HttpResponse::Ok().json(SuccessResponse{success: true})),
        Err(err) => match err {
            BlockingError::Error(diesel_error) => match diesel_error {
                DatabaseError(UniqueViolation, _msg,) => {
                    let res = HttpResponse::Conflict()
                    .json(SuccessResponse{success: false});
                    Ok(res)
                },
                _ => Ok(HttpResponse::InternalServerError().finish()),
            },
            BlockingError::Canceled => Ok(HttpResponse::InternalServerError().finish())
        }
    }
}

#[post("/login")]
pub async fn login_user(pool: web::Data<DbPool>, form: web::Json<User>)
-> Result<HttpResponse, actix_web::Error> {
    let conn = pool.get()
    .map_err(|e| {
        eprintln!("{}", e);
        HttpResponse::InternalServerError().finish()
    })?;

    let user = form.into_inner();
    let user_moved = user.clone();
    let res = web::block(move || actions::find_user_by_name(user_moved.name(), &conn)).await;
    let login = match res {
        Ok(db_user) => db_user.map_or(false, |u| u.password() == user.password()),
        _ => {
            HttpResponse::InternalServerError().finish();
            false
        }
    };
    Ok(HttpResponse::Ok().json(SuccessResponse{success: login}))
}

#[post("/auctions")]
pub async fn create_auction(pool: web::Data<DbPool>, form: web::Json<NewAuction>)
-> Result<HttpResponse, actix_web::Error> {
    let conn = pool.get()
    .map_err(|e| {
        eprintln!("{}", e);
        HttpResponse::InternalServerError().finish()
    })?;

    let auction = form.into_inner();

    let res = web::block(move || actions::insert_new_auction(&auction, &conn)).await;

    match res {
        Ok(_) => Ok(HttpResponse::Ok().json(SuccessResponse{success: true})),
        Err(err) => match err {
            BlockingError::Error(diesel_error) => match diesel_error {
                DatabaseError(UniqueViolation, _msg,) => {
                    let res = HttpResponse::Conflict()
                    .json(SuccessResponse{success: false});
                    Ok(res)
                },
                _ => Ok(HttpResponse::InternalServerError().finish()),
            },
            BlockingError::Canceled => Ok(HttpResponse::InternalServerError().finish())
        }
    }
}