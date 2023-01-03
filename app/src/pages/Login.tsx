import { useState } from 'react'
import LoginForm from '../components/login/LoginForm'
import RegisterForm from '../components/login/RegisterForm'

const Login = () => {
    const [register, setRegister] = useState(false)

    const handleRegister = () => {
        setRegister(!register)
    }

    return (
        <div>
            {register ? (
                <RegisterForm onClick={handleRegister} />
            ) : (
                <LoginForm onClick={handleRegister} />
            )}
        </div>
    )
}

export default Login
