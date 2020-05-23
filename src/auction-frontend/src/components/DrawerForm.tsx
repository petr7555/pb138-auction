import React, { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Col, DatePicker, Drawer, Form, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createAuction } from "../api/apiCalls";
import { UserContext } from "../App";
import moment from "moment";

// @ts-ignore
export const DrawerForm = ({refresh}) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const userContext = useContext(UserContext);

    // @ts-ignore
    const onFinish = (values) => {
        createAuction({
            userId: userContext.userState.user.id,
            name: values.name,
            description: values.description,
            until: values.until.toISOString()
        }).then(refresh);
        form.resetFields();
        setVisible(false);
    }

    const [form] = Form.useForm();

    // @ts-ignore
    function disabledDate(current) {
        // Can not select days before today
        return current && current < moment().startOf('day');
    }

    return (
        <>
            <Button className="drawer-form-button" type="primary" onClick={showDrawer}>
                <PlusOutlined/> New offer
            </Button>
            <Drawer
                className="drawer-form"
                width={720}
                title="Create a new auction"
                onClose={onClose}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={onClose} style={{marginRight: 8}}>
                            Cancel
                        </Button>
                        <Button onClick={form.submit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                <Form form={form} onFinish={onFinish} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter auction name'}]}
                            >
                                <Input placeholder="Please enter auction name"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="until"
                                label="Ends at"
                                rules={[{required: true, message: 'Please choose the end of the auction'},
                                    () => ({
                                        validator(rule, value) {
                                            if (!value || value >= moment().add(1, 'minute')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The duration must be at least 1 minute');
                                        },
                                    })]}
                            >
                                <DatePicker showTime disabledDate={disabledDate}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter auction description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Please enter auction description"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}
