import React, { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface Props {
    until: string;
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

export const Timer = ({until}: Props) => {
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
    return (
        <p>{timerComponents.length ? <span>Ends in: {timerComponents}</span> : <span>Time's up!</span>}</p>
    )
};
