import styled from "styled-components";
import LoginForm from "../../components/auth/LoginForm";


export default function LoginPage() {
    return (
        <Container>
            <LoginForm />
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