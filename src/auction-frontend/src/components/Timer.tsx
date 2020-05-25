import React, { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface Props {
    until: string;
    setOpacity?: any;
}

const calculateTimeLeft = (until: string): TimeLeft => {
    const difference = +Date.parse(until) - +new Date();
    let timeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

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

export const Timer = ({until, setOpacity}: Props) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(until));

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(until));
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

    if (timerComponents.length === 0){
        setOpacity && setOpacity("50%");
    }

    return (
        <p>{timerComponents.length ? <span>Ends in: {timerComponents}</span> : <span>The auction has ended</span>}</p>
    )
};
