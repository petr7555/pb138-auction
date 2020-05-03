import React from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../hooks/use-stores";
import {Button, Form, Input} from 'antd';
import {Store} from "antd/lib/form/interface";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export const Login = observer(() => {
    const {userStore} = useStores();

    const onFinish = (values: Store) => {
        userStore.login(values.username);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{username: ""}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
})
