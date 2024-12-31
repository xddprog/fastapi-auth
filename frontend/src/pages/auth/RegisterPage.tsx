import styled from "styled-components"
import RegisterForm from "../../components/auth/RegisterForm"

export default function RegisterPage (){
    return (
        <Container>
            <RegisterForm />
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
