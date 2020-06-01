import React from "react";
import { Item } from "./Item";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Row, Skeleton } from "antd";
import { useSortedAuctions } from "../hooks/useSortedAuctions";

export const Auctions = (): JSX.Element => {
    const [{data: auctions, isLoading}, ] = useSortedAuctions(
        'http://localhost:8080/api/auctions',
        [],
    );

    return (
        <div className="auctions">
            {isLoading ?
            (<Row gutter={[16, 16]}>
                {[1, 2, 3, 4, 5, 6, 7].map(() => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Skeleton/>
                        </Col>
                    )
                })}
            </Row>) :
            (<Row gutter={[16, 16]}>
                {auctions.map((auction: AuctionItem) => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Item item={auction} key={auction.id} loosing={auction.loosing}/>
                        </Col>
                    )
                })}
            </Row>)}
        </div>
    )
};
