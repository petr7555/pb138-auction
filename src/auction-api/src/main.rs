#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

use actix_web::{middleware, App, HttpServer};
use diesel::r2d2::ConnectionManager;
use diesel::{r2d2, PgConnection};
use diesel_migrations::embed_migrations;

mod actions;
mod get;
mod models;
mod post;
mod response;
mod schema;

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
            .wrap(actix_cors::Cors::default())
            .service(get::user)
            .service(get::auction)
            .service(get::all_auctions)
            .service(get::all_auctions_user_created)
            .service(get::auctions_taken_part_user)
            .service(post::register_user)
            .service(post::login_user)
            .service(post::create_auction)
            .service(post::create_bid)
    })
    .bind(&bind)?
    .run()
    .await
}
