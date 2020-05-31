import React, { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface Props {
    until: string;
    setOpacity?: React.Dispatch<React.SetStateAction<string>>;
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

export const Timer = ({until, setOpacity}: Props): JSX.Element => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(until));

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(until));
        }, 1000);
    });

    let timeLeftStr = "";

    if (timeLeft.days) {
        timeLeftStr +=  timeLeft.days + " days";
    } else if (timeLeft.hours > 1) {
        timeLeftStr +=  timeLeft.hours + " hours";
    } else if (timeLeft.hours) {
        timeLeftStr +=  timeLeft.hours + " hours " + timeLeft.minutes + " minutes";
    } else if (timeLeft.minutes > 10) {
        timeLeftStr +=  timeLeft.minutes + " minutes";
    }  else if (timeLeft.minutes) {
        timeLeftStr +=  timeLeft.minutes + " minutes " + timeLeft.seconds + " seconds";
    } else if (timeLeft.seconds) {
        timeLeftStr +=  timeLeft.seconds + " seconds";
    }

    if (!timeLeftStr.length){
        setOpacity && setOpacity("50%");
    }

    return (
        <p>{timeLeftStr.length ? <span>Ends in: {timeLeftStr}</span> : <span>The auction has ended</span>}</p>
    )
};
