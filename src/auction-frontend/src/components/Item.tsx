import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import AuctionItem from "../entitites/AuctionItem";

interface ItemProps {
    item: AuctionItem;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const calculateTimeLeft = (isoString: string): TimeLeft => {
    const difference = +Date.parse(isoString) - +new Date();
    let timeLeft: TimeLeft  = {days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0};

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

export const Item = (props: ItemProps) => {
    const {item} = props;

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(item.until));

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(item.until));
        }, 1000);
    });

    const timerComponents: string[] = [];

    Object.keys(timeLeft).forEach(interval => {
        // @ts-ignore
        if (!timeLeft[interval]) {
            return;
        }
        // @ts-ignore
        timerComponents.push(`${timeLeft[interval]} ${interval} `);
    });

    return (
        <Card key={item.id} title={item.name} extra={<a href="#">More</a>} hoverable>
            <p>{item.description}</p>
            <p>${item.actualPrice}</p>
            <p>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</p>
        </Card>
    );
}
