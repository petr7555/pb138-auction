import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from 'react-router';
import { Button, Descriptions, Form, InputNumber, Skeleton } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Timer } from "./Timer";
import { Store } from "antd/lib/form/interface";
import axios from 'axios';
import { showError, showSuccess } from "../api/apiCalls";
import { UserContext } from "../App";

interface MatchParams {
    id: string;
}

export const AuctionDetail = ({match}: RouteComponentProps<MatchParams>) => {
        const userContext = useContext(UserContext);

        const [item, setItem] = useState<AuctionItem | undefined>(undefined);

        const fetchItem = async () => {
            try {
                const res = await axios(`http://localhost:8080/api/auctions/${match.params.id}`);
                setItem(res.data);
            } catch (error) {
                showError(error);
            }
        }

        useEffect(() => {
            fetchItem();
        })


        const onFinish = async (values: Store) => {
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
                        (<Form initialValues={{bid: item.actualPrice + 1}}
                               onFinish={onFinish}>
                            <Form.Item
                                name={"bid"}>
                                <InputNumber style={{width: "200px"}}
                                    min={item.actualPrice + 1}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Place bid
                                </Button>
                            </Form.Item>
                        </Form>) : <p>You can't bid on your own auction</p>)}
                </div>
                : <Skeleton/>
        )
    }
;
