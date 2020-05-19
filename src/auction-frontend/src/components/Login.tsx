import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Modal, Typography } from 'antd';
import { Store } from "antd/lib/form/interface";
import { useStores } from "../stores/use-stores";
import { FormFragment } from "./FormFragment";

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

    const [visible, setVisible] = useState();
    const [form] = Form.useForm();

    const onFinishLogin = (values: Store): void => {
        userStore.login(values.username, values.password);
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
                <FormFragment/>
                <p>Do not have an account? <a onClick={showModal}>Register.</a></p>
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
