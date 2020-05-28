import React, { useContext } from "react";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Divider, Row, Skeleton } from "antd";
import { Item } from "./Item";
import { userContextMain } from "../App";
import { useSortedAuctions } from "../hooks/useSortedAuctions";
import { UserContext } from "../types/types";

export const ParticipatingAuctions = (): JSX.Element => {
    const userContext = useContext<UserContext>(userContextMain);

    const [{data, isLoading}, ] = useSortedAuctions(
        `http://localhost:8080/api/auctions-taken-part/user/${userContext.userState.user.id}`,
        [],
    );

    return (
        <div>
            <Divider><h2>Participating in</h2></Divider>
            {isLoading ? (
                <Row gutter={[16, 16]}>
                    {[1, 2, 3].map(() => {
                        return (
                            <Col xs={24}>
                                <Skeleton/>
                            </Col>
                        )
                    })}
                </Row>) : (
                <>
                    {data.length === 0 ? <p>You did not bid in any auction. Go ahead and bid in one!</p> :
                        <Row gutter={[16, 16]}>
                            {data.map((auction: AuctionItem) => {
                                return (
                                    <Col xs={24}>
                                        <Item item={auction} key={auction.id} loosing={auction.loosing}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </>
            )}
        </div>
    )
};
