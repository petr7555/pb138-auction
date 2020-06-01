import React, { useState } from "react";
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

const Bold = ({title, value}: { title: string; value: string }): JSX.Element => {
    return <p><span className="item__bold">{title}: </span>{value}</p>
}

export const Item = (props: ItemProps): JSX.Element => {
    const {item} = props;

    const [opacity, setOpacity] = useState<string>("100%");

    const title = <span>{props.loosing &&
    <WarningTwoTone twoToneColor="red" title={"Someone has placed higher bid"}/>} {item.name}</span>
    return (
        <Link to={`/auctions/${item.id}`}>
            <Card key={item.id} title={title} extra={<button className="button-link">More</button>} hoverable headStyle={{opacity}} bodyStyle={{opacity}}>
                <Bold title="Description" value={item.description}/>
                <Bold title="Price" value={`$${item.actualPrice}`}/>
                <Bold title="Winner" value={item.winningUser}/>
                <Timer until={item.until} setOpacity={setOpacity}/>
            </Card>
        </Link>
    );
}
