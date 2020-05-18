import { observer } from "mobx-react-lite";
import React from "react";
import { Col, Divider, Row } from "antd";
import { ParticipatingAuctions } from "./ParticipatingAuctions";
import { MyOfferings } from "./MyOfferings";

export const MyAuctions = observer(() => {
    return (
        <Row>
            <Col span={8}>
                <ParticipatingAuctions/>
            </Col>
            <Col>
                <Divider type="vertical" style={{height: "100%"}}/>
            </Col>
            <Col span={15}>
                <MyOfferings/>
            </Col>
        </Row>
    )
});
