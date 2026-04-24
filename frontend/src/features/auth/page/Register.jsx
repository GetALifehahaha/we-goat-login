import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
// import { X } from 'lucide-react';
import { Input, Button, regex, Feedback } from '../../shared/';

const rules = [
    { field: 'username', limit: 255, min: 8, required: true },
    { field: 'password', limit: 255, min: 8, required: true },
    { field: 'firstName', limit: 255, min: 8, required: true },
    { field: 'lastName', limit: 255, min: 8, required: true },
    { field: 'email', limit: 255, min: 8, required: true, isEmail: true },
]

const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        firstName: '', lastName: '', email: '', username: '', password: ''
    });

    const [fieldError, setFieldError] = useState({
        firstName: '', lastName: '', email: '', username: '', password: ''
    });

    const [feedback, setFeedback] = useState([{ type: '', message: '' }])

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

            if (rule?.isEmail && !regex.email.test(value.trim())) {
                handleFieldError(field, "This field must be in email format.");
                valid = false; pass = false;
            }

            if (pass) handleFieldError(field, "")
        });

        return valid;
    }

    const handleChange = (e) => {
        setCredentials(() => {
            return {
                ...credentials,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleFeedback = (responses) => {
        let errorFeedback = [{}];
        Object.entries(responses).forEach(([_, messages]) => {
            console.log(messages)
            const message = messages.join(', ');
            errorFeedback = [...errorFeedback, { type: 'error', message: message }];
            setFeedback(errorFeedback)
        });
    }

    return (
        <div className='absolute left-0 top-0 max-w-full w-full max-h-screen h-full bg-black/10 backdrop-blur overflow-hidden
                        flex justify-center items-center
        '>
            <div className='bg-slate-100 w-180 p-4 rounded-xl border border-slate-300 transition-all'>
                <div className='text-md flex flex-col items-center justify-between mb-8'>
                    <h5 className='text-slate-700 text-xs font-semibold tracking-wide'>Sign Up</h5>
                    <h1 className='font-bold text-lg text-slate-800'>We-Goat</h1>
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {

                        if (!validateFields()) return

                        const response = await authService.register(credentials);


                        if (response.status == 200) {
                            navigate('/login')
                        }
                        if (response.status == 400) {
                            handleFeedback(response.data)
                        }
                    } catch {
                        console.log('')
                    } finally {
                        setLoading(false);
                    }

                }}
                    className='flex flex-col p-2 gap-4'
                >
                    <div className='grid grid-cols-3 gap-2'>
                        <Input
                            type='text'
                            name='firstName'
                            label='First Name'
                            value={credentials.firstName}
                            onChange={handleChange}
                            error={fieldError.firstName}
                            onClear={clearField}
                        />
                        <Input
                            type='text'
                            name='lastName'
                            label='Last Name'
                            value={credentials.lastName}
                            onChange={handleChange}
                            error={fieldError.lastName}
                            onClear={clearField}
                        />
                        <Input
                            type='text'
                            name='email'
                            label='Email Address'
                            value={credentials.email}
                            onChange={handleChange}
                            error={fieldError.email}
                            onClear={clearField}
                        />
                    </div>

                    <hr className='my-2 text-mauve-300 ' />

                    <div className='grid grid-cols-2 gap-2'>
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
                    </div>

                    <Button type='submit' text='Login' loading={loading} />
                </form>

                <Feedback feedback={feedback} />

                <div className='w-80 flex mx-auto my-4 justify-center items-center text-center text-xs font-medium text-mauve-600'>
                    <Link to='/login' className='hover:text-mauve-800 text-center'>Already have an account? Log in here</Link>
                </div>

            </div>
        </div >
    )
}

export default Register