import { useState } from 'react'
import { Link } from 'react-router-dom';
import authService from '../services/authService';
// import { X } from 'lucide-react';
import { Input, Button, PageLogo } from '../../shared/';

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
        <div className='relative left-0 top-0 max-w-full w-full h-screen bg-linear-to-br from-neutral-800 to-neutral-900 backdrop-blur overflow-hidden
                        flex justify-center items-center
        '>
            <div className='w-100 p-4 rounded-xl transition-all '>
                <div className='text-md flex flex-col items-center justify-between'>
                    <PageLogo />

                    <h1 className='text-mauve-50 text-2xl font-semibold mt-12 mb-4'>
                        Welcome to We-Goat
                    </h1>
                    <Link to='/signup' className='text-mauve-400 text-sm'>New to We-Goat? <strong className='font-bold text-mauve-100'>Signup here</strong></Link>

                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    if (!validateFields()) return

                    authService.login(credentials);
                }}
                    className='flex flex-col p-2 gap-4 my-12'
                >
                    <Input
                        type='text'
                        name='username'
                        value={credentials.username}
                        hasCounter={false}
                        onChange={handleChange}
                        placeholder='Your username'
                        error={fieldError.username}
                        onClear={clearField}
                        className=' rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='password'
                        name='password'
                        hasCounter={false}
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder='Your password'
                        error={fieldError.password}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'

                    />

                    <Button type='submit' text='Login' className='w-full rounded-2xl bg-white text-mauve-950 text-sm hover:w-full hover:bg-white/70 mt-0' />
                    <Link to='/forgotPassword' className='text-white text-xs font-semibold'>Forgot Password?</Link>
                </form>

                <hr className='w-full text-white/20' />
                <h5 className='text-xs text-white/30 text-center mt-2 font-light tracking-wide'>Empowered by Django, DRF, and React</h5>
            </div>
        </div >
    )
}

export default Login