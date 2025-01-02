import { Form, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthServicesGroup from "./OauthServicesGroup";
import AuthService from "../../api/services/authService";
import { BaseUserInterface } from "../../schemas/user";


interface ComponentProps {
    setUser: React.Dispatch<React.SetStateAction<BaseUserInterface | null>>
}


export default function LoginForm({setUser}: ComponentProps) {
    const [form] = useForm();
    const [, contextHolder] = message.useMessage();

    async function onFinish() {
        await AuthService.loginUser(await form.validateFields());
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
                    <Input prefix={<MailOutlined />} type="email" placeholder="Почта" size="large" />
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
                    <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" size="large" />
                </Form.Item>
                <OauthServicesGroup isRegisterForm={false} />
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

