import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

import ProtectedRoute, { ProtectedRouteProps } from './components/common/ProtectedRoute'
import { useAppSelector } from './app/hooks'
import { selectUser } from './reducers/userSlice'

const App = () => {
    const location = useLocation().pathname

    const { loggedIn } = useAppSelector(selectUser)

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: !!loggedIn,
        authenticationPath: '/login'
    }

    return (
        <>
            {location !== '/login' ? <Sidebar /> : null}
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Feed />} />
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={
                            <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />} />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Settings />} />
                        }
                    />
                </Routes>
            </main>
        </>
    )
}

export default App
