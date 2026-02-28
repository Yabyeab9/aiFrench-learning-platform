import {Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Register from "../pages/Register.tsx";
import LessonPage from "../features/lessons/LessonPage.tsx";
import Login from "../pages/Login.tsx";
import AiTutorPage from "../pages/AiTutorPage.tsx";
import HomePage from "../Page.tsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.tsx";
import ProgressPage from "../pages/ProgressPage.tsx";
import SettingsPage from "../pages/Settings.tsx";
import ProfilePage from "../pages/Profile.tsx";

export default function App() {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="" element={<HomePage />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                    <ProtectedRoute>
                        <AppLayout>
                            <Dashboard />
                        </AppLayout>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/lesson"
                    element={
                        <ProtectedRoute>
                        <AppLayout>
                            <LessonPage />
                        </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai"
                    element={
                        <ProtectedRoute>
                        <AppLayout>
                            <AiTutorPage />
                        </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/progress"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <ProgressPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <SettingsPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <ProfilePage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
    );
}
