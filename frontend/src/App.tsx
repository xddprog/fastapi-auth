import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import MainPage from "./pages/main/MainPage"
import { ConfigProvider } from "antd"
import { appTheme } from "./utils/themeSettings"

function App() {
    return (
        <ConfigProvider theme={appTheme}>
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App