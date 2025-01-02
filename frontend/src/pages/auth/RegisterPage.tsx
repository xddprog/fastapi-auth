import styled from "styled-components"
import RegisterForm from "../../components/auth/RegisterForm"
import { BaseUserInterface } from "../../schemas/user"

interface ComponentProps {
    setUser: React.Dispatch<React.SetStateAction<BaseUserInterface | null>>
}

export default function RegisterPage ({setUser}: ComponentProps) {
    return (
        <Container>
            <RegisterForm setUser={setUser}/>
        </Container>
    )
}
    

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`
