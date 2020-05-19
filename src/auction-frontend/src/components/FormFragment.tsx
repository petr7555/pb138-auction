import { Form, Input } from "antd";
import React from "react";


export const FormFragment = () => {
    return (
        <>
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
        </>
    )
}
