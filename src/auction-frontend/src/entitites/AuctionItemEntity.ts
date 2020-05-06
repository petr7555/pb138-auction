export default interface AuctionItemEntity {
    id: number,
    name: string,
    description: string,
    user: string,
    // ISO string
    until: string,
    actual_price: number,
    winning_user: string
}

// {
//     id: 1,
//         name: "Brand new fridge",
//     description: "Too big for my flat.",
//     user: "Anne",
//     until: "2020/05/01",
//     actual_price: 100,
//     winning_user: "John"
// }
