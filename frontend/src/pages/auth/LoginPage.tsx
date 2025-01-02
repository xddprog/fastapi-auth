import styled from "styled-components";
import LoginForm from "../../components/auth/LoginForm";
import { BaseUserInterface } from "../../schemas/user";


interface ComponentProps {
    setUser: React.Dispatch<React.SetStateAction<BaseUserInterface | null>>
}


export default function LoginPage({setUser}: ComponentProps) {
    return (
        <Container>
            <LoginForm setUser={setUser} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`