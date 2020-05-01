#[macro_use]
extern crate diesel;

use diesel::{PgConnection, r2d2};
use diesel::r2d2::ConnectionManager;
use actix_web::{web, HttpResponse, HttpServer, middleware, get, post, App, error::BlockingError};

mod actions;
mod models;
mod schema;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[get("/users/{id}")]
async fn get_user(pool: web::Data<DbPool>, user_id: web::Path<i64>) -> Result<HttpResponse, actix_web::Error> {
    let user_id = user_id.into_inner();
    let conn = pool.get().expect("Database pool error");

    let user = web::block(move || actions::find_user_by_id(user_id, &conn))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    if let Some(user) = user {
        Ok(HttpResponse::Ok().json(user))
    } else {
        let res = HttpResponse::NotFound()
            .body(format!("No user found with id: {}", user_id));
        Ok(res)
    }
}

#[post("/register")]
async fn register_user(pool: web::Data<DbPool>, form: web::Json<models::NewUser>)
-> Result<HttpResponse, actix_web::Error> {
    let conn = pool.get().expect("Database pool error");

    let new_user = form.into_inner();

    use diesel::result::Error::DatabaseError;
    use diesel::result::DatabaseErrorKind::UniqueViolation;

    let res = web::block(move || actions::insert_new_user(&new_user, &conn)).await;
    match res {
        Ok(user) => Ok(HttpResponse::Ok().json(user)),
        Err(err) => match err {
            BlockingError::Error(diesel_error) => match diesel_error {
                DatabaseError(UniqueViolation, _msg,) => Ok(HttpResponse::Conflict().header("Content-Type", "application/json").body(r#"{"error": "name is taken"}"#)),
                _ => Ok(HttpResponse::InternalServerError().finish())
            },
            BlockingError::Canceled => Ok(HttpResponse::InternalServerError().finish())
        }
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("Hello, world!");

    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<PgConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let bind = "0.0.0.0:8080";

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(get_user)
            .service(register_user)
    })
    .bind(&bind)?
    .run()
    .await
}
