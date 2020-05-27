import React from "react";
import { Col, Divider, Row } from "antd";
import { ParticipatingAuctions } from "./ParticipatingAuctions";
import { MyOfferings } from "./MyOfferings";

export const MyAuctions = (): JSX.Element => {
    return (
        <Row>
            <Col xs={24} sm={12} md={8} lg={8} xxl={8}>
                <ParticipatingAuctions/>
            </Col>
            <Col className="my-auctions-divider">
                <Divider type="vertical" style={{height: "100%"}}/>
            </Col>
            <Col xs={23} sm={11} md={15} lg={15} xxl={15}>
                <MyOfferings/>
            </Col>
        </Row>
    );
};
