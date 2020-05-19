import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import AuctionItem from "../entitites/AuctionItem";
import { Col, Divider, Row } from "antd";
import { Item } from "./Item";
import { DrawerForm } from "./DrawerForm";
import useDataApi from "use-data-api";
import { UserContext } from "../App";

export const MyOfferings = observer(() => {
    const userContext = useContext(UserContext);

    const [{data, isLoading, isError}, doFetch] = useDataApi(
        // @ts-ignore
        `http://localhost:8080/api/auctions/user/${userContext.userState.user.id}`,
        [],
    );

    return (
        <div>
            <Divider><h2>My offerings</h2></Divider>
            <DrawerForm/>
            {data.length === 0 ? <p>You do not have any auctions. Go ahead and create one!</p> :
                <Row gutter={[16, 16]}>
                    {data.map((auction: AuctionItem) => {
                        return (
                            <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                                <Item item={auction} key={auction.id}/>
                            </Col>
                        )
                    })}
                </Row>
            }
        </div>
    )
});
