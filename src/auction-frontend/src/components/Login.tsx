import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Button, Form, Modal, Typography } from 'antd';
import { Store } from "antd/lib/form/interface";
import { FormFragment } from "./FormFragment";
import { showError } from "../api/apiCalls";
import axios from 'axios';
import { UserContext } from "../App";

const {Title} = Typography;

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 5},
};
const tailLayout = {
    wrapperCol: {flex: "auto"},
};

export const Login = observer(() => {
    const userContext = useContext(UserContext);

    const [visible, setVisible] = useState<boolean>();
    const [error, setError] = useState(false);
    const [form] = Form.useForm();

    const onFinishLogin = async (values: Store) => {
        try {
            const res = await axios.post('http://localhost:8080/api/login', {
                name: values.username,
                password: values.password
            });
            // @ts-ignore
            userContext.setUserState({
                user: res.data,
                loggedIn: true
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    setError(true);
                    return;
                }
            }
            showError(error);
        }
    };

    const onFinishRegister = (values: Store): void => {
        console.log(values.username, values.password);
        form.resetFields();
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <div>
            <Title className="login-title">The BESTEST auction system</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{username: ""}}
                onFinish={onFinishLogin}
                className="login-form"
            >
                {error && <Alert className="login-alert" message="Wrong username or password" type="error"/>}
                <FormFragment/>
                <p>Do not have an account? <button className="button-link" onClick={showModal}>Register</button></p>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form__button" size="large">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Register"
                visible={visible}
                onOk={form.submit}
                onCancel={closeModal}
            >
                <Form
                    form={form}
                    onFinish={onFinishRegister}
                >
                    <FormFragment/>
                </Form>
            </Modal>
        </div>
    );
})
