import { Typography } from "antd";
import { BaseUserInterface } from "../../schemas/user";


interface ComponentProps {
    user: BaseUserInterface | null,
}

function MainPage({user}: ComponentProps): JSX.Element {
    return (
        <>
            <Typography.Title>Добро пожаловать, {user?.username}</Typography.Title>
        </>
    );
}

export default MainPage;