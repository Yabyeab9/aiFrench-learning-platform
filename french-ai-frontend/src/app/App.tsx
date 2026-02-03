import {Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Register from "../pages/Register.tsx";
import LessonPage from "../features/lessons/LessonPage.tsx";
import Login from "../pages/Login.tsx";
import AiTutorPage from "../pages/AiTutorPage.tsx";
import HomePage from "../Page.tsx";

export default function App() {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="" element={<HomePage />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <AppLayout>
                            <Dashboard />
                        </AppLayout>
                    }
                />

                <Route
                    path="/lesson"
                    element={
                        <AppLayout>
                            <LessonPage />
                        </AppLayout>
                    }
                />

                <Route
                    path="/ai"
                    element={
                        <AppLayout>
                            <AiTutorPage />
                        </AppLayout>
                    }
                />
            </Routes>
    );
}
