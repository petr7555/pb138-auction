import React, { useEffect, useState } from "react";
import { RouteComponentProps } from 'react-router';
import { Button, Descriptions, Form, InputNumber, message, Skeleton } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Timer } from "./Timer";
import { Store } from "antd/lib/form/interface";

interface MatchParams {
    id: string;
}

export const AuctionDetail = ({match}: RouteComponentProps<MatchParams>) => {
        const [item, setItem] = useState<AuctionItem | undefined>(undefined);

        const fetchItem = async () => {
            try {
                // const res = await fetch(`http://localhost:8080/api/auctions/${match.params.id}`);
                // return res.json();
                const result = {
                    id: 1,
                    name: "Brand new fridge",
                    description: "Too big for my flat.",
                    user: "Anne",
                    until: "2020/05/20",
                    actualPrice: 100,
                    winningUser: "John"
                };
                setItem(result);
            } catch (error) {
                message.error(error.message)
            }
        }

        useEffect(() => {
            // simulate network delay
            setTimeout(() => {
                fetchItem();
            }, 1000)
        }, [])


        const onFinish = async (values: Store) => {
            try {
                const response = await fetch("http://localhost:8080/api/bids", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: values.bid
                })
                await fetchItem();
                response.ok ? message.success('Bid has been placed.') : message.error("Bid couldn't be placed.");
            } catch (error) {
                message.error(error.message);
            }
        };

        return (
            item ?
                <div>
                    <Descriptions title={item.description}>
                        <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
                        <Descriptions.Item label="Seller">{item.user}</Descriptions.Item>
                        <Descriptions.Item label="Ends in"><Timer until={item.until}/></Descriptions.Item>
                        <Descriptions.Item label="Current winner">{item.winningUser}</Descriptions.Item>
                        <Descriptions.Item label="Price">${item.actualPrice}</Descriptions.Item>
                    </Descriptions>
                    <Form initialValues={{bid: item.actualPrice + 1}}
                          onFinish={onFinish}>
                        <Form.Item
                            name={"bid"}>
                            <InputNumber
                                min={item.actualPrice + 1}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Place bid
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                : <Skeleton/>
        )
    }
;
