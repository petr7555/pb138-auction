import React, { useEffect, useState } from "react";
import { RouteComponentProps } from 'react-router';
import { Button, Descriptions, Form, InputNumber, message, notification, Skeleton } from "antd";
import AuctionItem from "../entitites/AuctionItem";
import { Timer } from "./Timer";
import { Store } from "antd/lib/form/interface";
import axios from 'axios';
import { useStores } from "../stores/use-stores";
import { showError, showSuccess } from "../api/apiCalls";

interface MatchParams {
    id: string;
}

export const AuctionDetail = ({match}: RouteComponentProps<MatchParams>) => {
        const {userStore} = useStores();

        const [item, setItem] = useState<AuctionItem | undefined>(undefined);

        const fetchItem = async () => {
            try {
                const res = await axios(`http://localhost:8080/api/auctions/${match.params.id}`);
                // const result = {
                //     id: 1,
                //     name: "Brand new fridge",
                //     description: "Too big for my flat.",
                //     user: "Anne",
                //     until: "2020/05/20",
                //     actualPrice: 100,
                //     winningUser: "John"
                // };
                setItem(res.data);
            } catch (error) {
                showError(error);
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
                const response = await axios.post("http://localhost:8080/api/bids", {
                    userId: userStore.user.id,
                    auctionId: item?.id,
                    amount: values.bid
                });
                await fetchItem();
                showSuccess("Bid has been placed! You are now the highest bidder!")
            } catch (error) {
                showError(error);
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
