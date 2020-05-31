import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from 'react-router';
import { Button, Descriptions, Form, InputNumber, Skeleton, Divider } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Timer } from "./Timer";
import { Store } from "antd/lib/form/interface";
import axios from 'axios';
import { showError, showSuccess } from "../api/apiCalls";
import { userContextMain } from "../App";
import { UserContext } from "../types/types";

interface MatchParams {
    id: string;
}

export const AuctionDetail = ({match}: RouteComponentProps<MatchParams>): JSX.Element => {
        const userContext = useContext<UserContext>(userContextMain);

        const [item, setItem] = useState<AuctionItem | undefined>(undefined);

        const fetchItem = async (): Promise<void> => {
            try {
                const res = await axios(`http://localhost:8080/api/auctions/${match.params.id}`);
                setItem(res.data);
            } catch (error) {
                showError(error);
            }
        }

        useEffect(() => {
            fetchItem();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])


        const onFinish = async (values: Store): Promise<void> => {
            try {
                await axios.post("http://localhost:8080/api/bids", {
                    userId: userContext.userState.user.id,
                    auctionId: item.id,
                    amount: values.bid
                });
                await fetchItem();
                showSuccess("Bid has been placed! You are now the highest bidder!")
            } catch (error) {
                showError(error);
            }
        };
        const active = item && new Date(item.until) > new Date();

        return (
            item ?
                <div>
                    <Descriptions title={item.description}>

                        <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
                        <Descriptions.Item label="Seller">{item.user}</Descriptions.Item>
                        {active ? <Descriptions.Item label="Ends in"><Timer until={item.until}/></Descriptions.Item> :
                            <p>The auction has ended.</p>}
                        <Descriptions.Item label="Current winner">{item.winningUser}</Descriptions.Item>
                        <Descriptions.Item label="Price">${item.actualPrice}</Descriptions.Item>
                    </Descriptions>
                    {active && (item.user !== userContext.userState.user.name ?
                        (<div>
                            <Divider type="horizontal" style={{width: "100%"}}/>
                            <Form
                                initialValues={{bid: item.actualPrice + 1}}
                                onFinish={onFinish}>
                                <Form.Item
                                    name={"bid"}>
                                    <InputNumber style={{width: "200px"}}
                                        min={item.actualPrice + 1}
                                        formatter={(value): string => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Place bid
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>) : <p>You can't bid on your own auction</p>)}
                </div>
                : <Skeleton/>
        )
    }
;
