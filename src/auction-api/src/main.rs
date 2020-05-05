#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

use diesel::{PgConnection, r2d2};
use diesel::r2d2::ConnectionManager;
use diesel_migrations::embed_migrations;
use actix_web::{HttpServer, middleware, App};

mod actions;
mod models;
mod schema;
mod get;
mod post;
mod response;

embed_migrations!();

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("Hello, world!");

    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<PgConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    
    let conn = pool.get().expect("Database pool error");
    embedded_migrations::run(&conn).expect("Migration init failed");

    let bind = "0.0.0.0:8080";

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(get::user)
            .service(post::register_user)
            .service(post::login_user)
    })
    .bind(&bind)?
    .run()
    .await
}
