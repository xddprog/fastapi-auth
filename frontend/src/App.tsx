import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import MainPage from "./pages/main/MainPage"
import { ConfigProvider } from "antd"
import { appTheme } from "./utils/themeSettings"
import { useState } from "react"
import { BaseUserInterface } from "./schemas/user"
import AuthCallbackPage from "./pages/auth/AuthCallbackPage"

function App() {
    const [user, setUser] = useState<BaseUserInterface | null>(null)

    return (
        <ConfigProvider theme={appTheme}>
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<MainPage user={user}/>} />
                    <Route path="/login" element={<LoginPage setUser={setUser} />} />
                    <Route path="/register" element={<RegisterPage setUser={setUser} />} />
                    <Route
                        path="/auth/callback"
                        element={<AuthCallbackPage setUser={setUser} />}
                    />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App