import React, { useContext } from "react";
import { Item } from "./Item";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Row, Skeleton } from "antd";
import { useDataApi } from "../api/useDataApi";
import { UserContext } from "../App";
import { useSortedAuctions } from "../hooks/useSortedAuctions";

export const Auctions = () => {
    const [{data: auctions, isLoading, isError}, doFetch] = useSortedAuctions(
        'http://localhost:8080/api/auctions',
        [],
    );

    return (
        isLoading ?
            (<Row gutter={[16, 16]}>
                {[1, 2, 3, 4, 5, 6, 7].map(() => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Skeleton/>
                        </Col>
                    )
                })}
            </Row>) :
            (<Row gutter={[16, 16]}>
                {auctions.map((auction: AuctionItem) => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Item item={auction} key={auction.id} loosing={auction.loosing}/>
                        </Col>
                    )
                })}
            </Row>)
    )
};
