import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Item} from "./Item";
import {useStores} from "../hooks/use-stores";
import AuctionItemEntity from "../entitites/AuctionItemEntity";

export const Auctions = observer(() => {
    const {auctionsStore} = useStores();

    useEffect(() => {
        auctionsStore.fetchAuctions();
    }, [])

    return (
        <div>
            {auctionsStore.auctions.map((auction: AuctionItemEntity) => {
                return <Item item={auction} key={auction.id}/>
            })}
        </div>
    )
});
