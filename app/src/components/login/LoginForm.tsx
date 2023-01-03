import { useState, MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { login } from '../../reducers/userSlice'

type LoginResponse = {
    id: number
}

const LoginForm = ({ onClick }: { onClick: MouseEventHandler }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        const { value } = e.target
        setEmail(value)
    }

    const handlePassword = (e) => {
        const { value } = e.target
        setPassword(value)
    }

    const submitForm = (e) => {
        e.preventDefault()

        axios.post<LoginResponse>(`http://localhost:3001/auth`, { email, password }).then((res) => {
            console.log(res)
            if (res.status === 400) {
                // error
            }

            dispatch(login(res.data.id))
        })
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <button
                            onClick={onClick}
                            className="font-medium text-indigo-600 hover:text-indigo-500">
                            register for an account
                        </button>
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                onChange={handleEmail}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                onChange={handlePassword}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
