import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Link } from "react-router-dom";
import { Timer } from "./Timer";

interface ItemProps {
    item: AuctionItem;
}

export const Item = (props: ItemProps) => {
    const {item} = props;

    return (
            <Link to={`/auctions/${item.id}`}>
                <Card key={item.id} title={item.name} extra={<a href="#">More</a>} hoverable>
                    <p>{item.description}</p>
                    <p>${item.actualPrice}</p>
                    <Timer until={item.until}/>
                </Card>
            </Link>
    );
}
