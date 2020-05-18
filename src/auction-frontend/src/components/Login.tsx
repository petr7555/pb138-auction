import React from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../hooks/use-stores";
import {Button, Form, Input} from 'antd';
import {Store} from "antd/lib/form/interface";
import {Typography} from "antd";

const {Title} = Typography;

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 5},
};
const tailLayout = {
    wrapperCol: {flex: "auto"},
};

export const Login = observer(() => {
    const {userStore} = useStores();

    const onFinish = (values: Store): void => {
        userStore.login(values.username);
    };

    return (
        <div>
            <Title className="login-title">The BESTEST auction system</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{username: ""}}
                onFinish={onFinish}
                className="login-form"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                    className="login-form-username"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                    className="login-form-password"
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form__button" size="large">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
})
