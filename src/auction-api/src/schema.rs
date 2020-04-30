table! {
    auctions (id) {
        id -> BigInt,
        user_id -> BigInt,
        name -> Text,
        description -> Text,
        min_amount -> BigInt,
        instant_buyout -> Nullable<BigInt>,
        until -> Timestamp,
        active -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    bids (id) {
        id -> BigInt,
        user_id -> BigInt,
        auction_id -> BigInt,
        amount -> BigInt,
        active -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> BigInt,
        name -> Text,
        password -> Text,
        active -> Bool,
        created_at -> Timestamp,
    }
}

joinable!(auctions -> users (user_id));
joinable!(bids -> auctions (auction_id));
joinable!(bids -> users (user_id));

allow_tables_to_appear_in_same_query!(
    auctions,
    bids,
    users,
);
