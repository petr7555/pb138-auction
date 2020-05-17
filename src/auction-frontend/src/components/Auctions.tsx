import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Item} from "./Item";
import {useStores} from "../hooks/use-stores";
import AuctionItem from "../entitites/AuctionItem";

export const Auctions = observer(() => {
    const {auctionsStore} = useStores();

    useEffect(() => {
        auctionsStore.fetchAuctions();
    }, [])

    return (
        <div>
            {auctionsStore.auctions.map((auction: AuctionItem) => {
                return <Item item={auction} key={auction.id}/>
            })}
        </div>
    )
});
