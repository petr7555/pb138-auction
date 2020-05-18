import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Divider, Row } from "antd";
import { Item } from "./Item";
import { getMockAuctions } from "../mocks/mocks";

export const MyOfferings = observer(() => {

    const [auctions, setAuctions] = useState(getMockAuctions);

    return (
        <div>
            <Divider><h2>My offerings</h2></Divider>
            <Row gutter={[16, 16]}>
                {auctions.map((auction: AuctionItem) => {
                    return (
                        <Col xs={12}>
                            <Item item={auction} key={auction.id}/>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
});
