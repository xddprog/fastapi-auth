import { Form, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthServicesGroup from "./OauthServicesGroup";

export default function LoginForm() {
    const [form] = useForm();
    const [, contextHolder] = message.useMessage();

    async function onFinish() {
        await authService.LoginUser(await form.validateFields());
    }

    return (
        <FormContainer>
            {contextHolder}
            <Typography.Title level={1}>Вход в аккаунт</Typography.Title>
            <StyledForm
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите свою почту!",
                            type: "email",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} type="email" placeholder="Почта" />
                </Form.Item>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите свой пароль!",
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
                </Form.Item>
                <OauthServicesGroup />
            </StyledForm>
        </FormContainer>
    );
}

const StyledForm = styled(Form)`
    width: 100%;
    margin-bottom: 10px;
`;


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
`;

