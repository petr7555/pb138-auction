import { message } from "antd";
import NewAuction from "../entitites/NewAuction";

export const createAuction = async (auction: NewAuction) => {
    try {
        const response = await fetch("http://localhost:8080/api/auctions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auction)
        })
        response.ok ? message.success('Auction has been created')
            : message.error("Auction couldn't be created.");
    } catch (error) {
        message.error(error.message);
    }
}
