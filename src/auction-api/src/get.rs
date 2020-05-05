use actix_web::{web, HttpResponse, get};
use diesel::{PgConnection, r2d2};
use diesel::r2d2::ConnectionManager;
use crate::response::ErrorResponse;

use crate::actions;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[get("/users/{id}")]
pub async fn user(pool: web::Data<DbPool>, user_id: web::Path<i64>) -> Result<HttpResponse, actix_web::Error> {
    let user_id = user_id.into_inner();
    let conn = pool.get().expect("Database pool error");

    let user = web::block(move || actions::find_user_by_id(user_id, &conn))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish();
        })?;

    if let Some(user) = user {
        Ok(HttpResponse::Ok().json(user))
    } else {
        let error = ErrorResponse::from(format!("No user found with id: {}", user_id));
        let res = HttpResponse::NotFound()
            .json(error);
        Ok(res)
    }
}