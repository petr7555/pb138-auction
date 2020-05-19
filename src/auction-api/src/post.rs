use crate::models::{NewAuction, NewUser, NewBid};
use crate::response::SuccessResponse;
use actix_web::{error::BlockingError, post, web, HttpResponse};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::{r2d2, PgConnection};

use diesel::result::DatabaseErrorKind::UniqueViolation;
use diesel::result::Error::DatabaseError;

use crate::actions;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

type PoolConnection = PooledConnection<ConnectionManager<PgConnection>>;

fn get_conn(pool: web::Data<DbPool>) -> Result<PoolConnection, HttpResponse> {
    pool.get().map_err(|e| {
        eprintln!("{}", e);
        HttpResponse::InternalServerError().finish()
    })
}

enum Response{
    OK,
    DUPLICATE,
    ERROR
}

fn process_db_res<T>(res: Result<T, BlockingError<diesel::result::Error>>) -> Response
where
    T: Send + 'static
{
    match res {
        Ok(_) => Response::OK,
        Err(err) => match err {
            BlockingError::Error(diesel_error) => match diesel_error {
                DatabaseError(UniqueViolation, _msg) => Response::DUPLICATE,
                _ => Response::ERROR,
            },
            BlockingError::Canceled => Response::ERROR,
        },
    }
}

#[post("/api/register")]
pub async fn register_user(
    pool: web::Data<DbPool>,
    form: web::Json<NewUser>,
) -> Result<HttpResponse, actix_web::Error> {
    let conn = get_conn(pool)?;

    let new_user = form.into_inner();

    let res = web::block(move || actions::insert_new_user(&conn, &new_user)).await;
    match process_db_res(res) {
        Response::OK => 
            Ok(HttpResponse::Ok().json(SuccessResponse { success: true })),
        Response::DUPLICATE => 
            Ok(HttpResponse::Conflict().json(SuccessResponse { success: false })),
        Response::ERROR => 
            Ok(HttpResponse::InternalServerError().finish()),
    }
}

#[post("/api/login")]
pub async fn login_user(
    pool: web::Data<DbPool>,
    form: web::Json<NewUser>,
) -> Result<HttpResponse, actix_web::Error> {
    let conn = get_conn(pool)?;

    let user = form.into_inner();
    let user_moved = user.clone();
    let res = web::block(move || actions::find_user_by_name(&conn, user_moved.name())).await;
    if let Ok(user_res) = res {
        if let Some(user_res) = user_res {
            if user.password() == user.password() {
                return Ok(HttpResponse::Ok().json(user_res))
            }
        }
        return Ok(HttpResponse::Unauthorized().finish())
    }
    return Ok(HttpResponse::InternalServerError().finish())
}

#[post("/api/auctions")]
pub async fn create_auction(
    pool: web::Data<DbPool>,
    form: web::Json<NewAuction>,
) -> Result<HttpResponse, actix_web::Error> {
    let conn = get_conn(pool)?;

    let auction = form.into_inner();

    let res = web::block(move || actions::insert_new_auction(&conn, &auction)).await;

    match process_db_res(res) {
        Response::OK => 
            Ok(HttpResponse::Ok().json(SuccessResponse { success: true })),
        Response::DUPLICATE => 
            Ok(HttpResponse::Conflict().json(SuccessResponse { success: false })),
        Response::ERROR => 
            Ok(HttpResponse::InternalServerError().finish()),
    }
}

#[post("/api/bids")]
pub async fn create_bid(
    pool: web::Data<DbPool>,
    form: web::Json<NewBid>,
) -> Result<HttpResponse, actix_web::Error> {
    let conn = get_conn(pool)?;

    let bid = form.into_inner();

    let res = web::block(move || actions::insert_new_bid(&conn, &bid)).await;

    match process_db_res(res) {
        Response::OK => 
            Ok(HttpResponse::Ok().json(SuccessResponse { success: true })),
        Response::DUPLICATE => 
            Ok(HttpResponse::Conflict().json(SuccessResponse { success: false })),
        Response::ERROR => 
            Ok(HttpResponse::InternalServerError().finish()),
    }
}
