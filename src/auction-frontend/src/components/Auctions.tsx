import React, { useContext } from "react";
import { Item } from "./Item";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Row, Skeleton } from "antd";
import { useDataApi } from "../api/useDataApi";
import { UserContext } from "../App";

export const Auctions = () => {
    const [{data: auctions, isLoading, isError}, doFetch] = useDataApi(
        'http://localhost:8080/api/auctions',
        [],
    );

    auctions.sort((a: AuctionItem, b: AuctionItem) =>
        (a.until < b.until) ? 1 : -1
    )

    const userContext = useContext(UserContext);
    const [{data: participatingAuctions}] = useDataApi(
        `http://localhost:8080/api/auctions-taken-part/user/${userContext.userState.user.id}`,
        [],
    );

    const isLoosing = (auction: AuctionItem) => {
        return participatingAuctions.includes(auction) && auction.winningUser !== userContext.userState.user.name;
    }

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
                            <Item item={auction} key={auction.id} loosing={isLoosing(auction)}/>
                        </Col>
                    )
                })}
            </Row>)
    )
};
