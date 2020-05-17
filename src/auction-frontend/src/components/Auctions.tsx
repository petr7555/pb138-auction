import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Item } from "./Item";
import { useStores } from "../hooks/use-stores";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Row } from "antd";

export const Auctions = observer(() => {
    const {auctionsStore} = useStores();

    useEffect(() => {
        auctionsStore.fetchAuctions();
    }, [])

    return (
        <div className="auctions">
            <Row gutter={[16, 16]}>
                {auctionsStore.auctions.map((auction: AuctionItem) => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Item item={auction} key={auction.id}/>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
});
