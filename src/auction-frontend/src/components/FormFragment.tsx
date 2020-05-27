import { Form, Input } from "antd";
import React from "react";


export const FormFragment = (): JSX.Element => {
    return (
        <>
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
                className="login-form-username login-form-field"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
                className="login-form-password login-form-field"
            >
                <Input.Password/>
            </Form.Item>
        </>
    )
}
