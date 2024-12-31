import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


interface ComponentProps {
    isRegisterForm: boolean
}


export default function OauthServicesGroup ({isRegisterForm}: ComponentProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <ButtonsContiner>
            <StyledButton type="primary" htmlType="submit">
                {!isRegisterForm ? "Войти": "Зарегистрироваться"}
            </StyledButton>
            <ButtonsGrid>
                <StyledButton>
                    <StyledLinkButtonImage src="/public/social/yandex.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Yandex 
                </StyledButton>
                <StyledButton>
                    <StyledLinkButtonImage src="/public/social/vk.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c VK 
                </StyledButton>
                <StyledButton>
                    <StyledLinkButtonImage src="/public/social/github.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Github 
                </StyledButton>
                <StyledButton>
                    <StyledLinkButtonImage src="/public/social/telegram.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Telegram 
                </StyledButton>
            </ButtonsGrid>
            <LinksContainer>
                <LinksContinerItem>
                    <Typography.Paragraph style={{margin: 0}}>Забыли пароль?</Typography.Paragraph>
                    {isRegisterForm ? <a>Восстановить</a>: null}
                </LinksContinerItem>
                <LinksContinerItem>
                    <Typography.Paragraph>{!isRegisterForm ? "Нет аккаунта?": "Есть аккаунт?"}</Typography.Paragraph>
                    <a onClick={() => navigate(isRegisterForm ? "/login": "/register")}>
                        {isRegisterForm ? "Войти": "Зарегистрироваться"}
                    </a>
                </LinksContinerItem>
            </LinksContainer>
        </ButtonsContiner>
    )
}


const ButtonsContiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px
`;

const ButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
`;

const LinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;


const StyledButton = styled(Button)`
    box-shadow: none;
    width: 100%;
    height: 40px;
`;

const StyledLinkButtonImage = styled.img`
    width: 20px;
    height: 20px;
`;

const LinksContinerItem = styled.div`
    display: flex;
    gap: 5px;
`;