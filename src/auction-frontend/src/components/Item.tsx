import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Card} from "antd";
import AuctionItemEntity from "../entitites/AuctionItemEntity";

interface IItemProps {
    item: AuctionItemEntity
}

const calculateTimeLeft = (isoString: string) => {
    const difference = +Date.parse(isoString) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

export type TTimeLeft = ReturnType<typeof calculateTimeLeft>;

export const Item = (props: IItemProps) => {
    const {item} = props;


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(item.until));

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(item.until));
        }, 1000);
    });

    const timerComponents : string[] = [];

    Object.keys(timeLeft).forEach(interval => {
        // @ts-ignore
        if (!timeLeft[interval]) {
            return;
        }

        // @ts-ignore
        timerComponents.push(<span>{timeLeft[interval]} {interval}{" "}</span>);
    });

    return (
        <Card key={item.id} title={item.name} extra={<a href="#">More</a>} hoverable style={{width: 300}}>
            <p>{item.description}</p>
            <p>{item.actual_price}</p>
            <p>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</p>
        </Card>
    );
}
