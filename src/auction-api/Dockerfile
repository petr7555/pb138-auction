#FROM rust:1.40 as builder
#WORKDIR /usr/src/auction-api
#COPY . .
#RUN cargo install --path .

FROM debian:stable-slim
RUN apt-get update && apt-get install -y libpq-dev

#COPY --from=builder /usr/local/cargo/bin/auction-api /usr/local/bin/auction-api
COPY ./target/debug/auction-api /usr/local/bin/auction-api

EXPOSE 8080

#CMD while true; do sleep 1000; done # for debugging docker exec -it auction_auction-api_1 /bin/bash
CMD sleep 5; auction-api # sleep because database needs to be up 1st

