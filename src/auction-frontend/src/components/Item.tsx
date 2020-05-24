import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Link } from "react-router-dom";
import { Timer } from "./Timer";
import { WarningTwoTone } from '@ant-design/icons';

interface ItemProps {
    item: AuctionItem;
    loosing: boolean;
}

const Bold = ({title, value}: { title: string; value: string }) => {
    return <p><span style={{fontWeight: "bold"}}>{title}: </span>{value}</p>
}

export const Item = (props: ItemProps) => {
    const {item} = props;

    const title = <span>{props.loosing &&
    <WarningTwoTone twoToneColor="red" title={"Someone has placed higher bid"}/>} {item.name}</span>
    return (
        <Link to={`/auctions/${item.id}`}>
            <Card key={item.id} title={title} extra={<a href="#">More</a>} hoverable>
                <Bold title={"Description"} value={item.description}/>
                <Bold title="Price" value={`$${item.actualPrice}`}/>
                <Bold title={"Winner"} value={item.winningUser}/>
                <Timer until={item.until}/>
            </Card>
        </Link>
    );
}
