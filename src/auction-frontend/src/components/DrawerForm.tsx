import React, { useCallback, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Col, DatePicker, Drawer, Form, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createAuction } from "../api/apiCalls";
import { useStores } from "../stores/use-stores";

export const DrawerForm = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const {userStore} = useStores();

    const onFinish = useCallback((values) => {
        createAuction({
            userId: userStore.user.id,
            name: values.name,
            description: values.description,
            until: values.until.toISOString()
        });
        form.resetFields();
        setVisible(false);
    }, []);

    const [form] = Form.useForm();

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                <PlusOutlined/> New offer
            </Button>
            <Drawer
                title="Create a new auction"
                width={720}
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
                                rules={[{required: true, message: 'Please choose the end of the auction'}]}
                            >
                                <DatePicker showTime/>
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
