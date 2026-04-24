import { useState } from 'react'
import { Link } from 'react-router-dom';
import authService from '../services/authService';
// import { X } from 'lucide-react';
import { Input, Button } from '../../shared/';

const rules = [
    {
        field: 'username', limit: 255, min: 8, required: true
    },
    {
        field: 'password', limit: 255, min: 8, required: true
    }
]

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: '', password: ''
    });

    const [fieldError, setFieldError] = useState({
        username: '', password: ''
    })

    const handleFieldError = (field, message) => {
        setFieldError((prevErrors) => {
            return {
                ...prevErrors,
                [field]: message
            }
        })
    }

    const clearField = (field) => {
        setCredentials(credentials => {
            return {
                ...credentials, [field]: ''
            }
        })
    }

    const validateFields = () => {
        let valid = true;

        Object.entries(credentials).forEach((info) => {
            const field = info[0]; const value = info[1];

            const rule = rules.find(rule => rule.field == field);
            let pass = true;

            if (rule?.limit && value.trim().length > rule?.limit) {
                handleFieldError(field, `This field is too long. It must be no more than ${rule.limit}`);
                valid = false; pass = false;
            }


            if (rule?.min && rule?.required && value.trim().length < rule?.min) {
                handleFieldError(field, `${field[0].toUpperCase() + field.slice(1)} is too short. It must be at least ${rule.min} alphanumeric characters`);
                valid = false; pass = false;
            }

            if (rule?.required && value.trim() == '') {
                handleFieldError(field, "This field is required");
                valid = false; pass = false;
            }

            if (pass) handleFieldError(field, "")
        });

        // console.log("Validated: ", valid)
        return valid;
    }

    console.log("Field Error: ", fieldError)

    const handleChange = (e) => {
        setCredentials(() => {
            return {
                ...credentials,
                [e.target.name]: e.target.value
            }
        });
    }


    return (
        <div className='absolute left-0 top-0 max-w-full w-full max-h-screen h-full bg-black/10 backdrop-blur overflow-hidden
                        flex justify-center items-center
        '>
            <div className='bg-slate-100 w-120 p-4 rounded-xl border border-slate-300 transition-all'>
                <div className='text-md flex flex-col items-center justify-between mb-8'>
                    <h5 className='text-slate-700 text-xs font-semibold tracking-wide'>Login</h5>
                    <h1 className='font-bold text-lg text-slate-800'>We-Goat</h1>
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    if (!validateFields()) return

                    authService.login(credentials);
                }}
                    className='flex flex-col p-2 gap-4'
                >
                    <Input
                        type='text'
                        name='username'
                        label='Username'
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder='Username'
                        error={fieldError.username}
                        onClear={clearField}
                    />

                    <Input
                        type='password'
                        name='password'
                        label='Password'
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder='Password'
                        error={fieldError.password}
                        onClear={clearField}
                    />

                    <Button type='submit' text='Login' />
                </form>

                <div className='w-80 flex mx-auto my-4 items-center justify-between text-xs font-medium text-mauve-600'>
                    <Link to='/signup' className='hover:text-mauve-800'>New to We-Goat? Signup here</Link>
                    <Link to='/forgotPassword' className='hover:text-mauve-800'>Forgot Password?</Link>
                </div>
            </div>
        </div >
    )
}

export default Login