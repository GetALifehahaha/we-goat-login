import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Input, Button, regex, Feedback, PageLogo } from '../../shared/';

const rules = [
    { field: 'firstName', limit: 255, min: 2, required: true },
    { field: 'lastName', limit: 255, min: 2, required: true },
    { field: 'email', limit: 255, min: 8, required: true, isEmail: true },
    { field: 'username', limit: 255, min: 4, required: true },
    { field: 'password', limit: 255, min: 8, required: true },
]

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        firstName: 'Ahlan-nour', lastName: 'Sencio', email: 'hz202300049@wmsu.edu.ph', username: 'supa1dol123', password: 'qwertyui'
    });

    const [fieldError, setFieldError] = useState({
        firstName: '', lastName: '', email: '', username: '', password: ''
    });

    const [feedback, setFeedback] = useState([]);

    const clearField = (field) => {
        setCredentials(prev => ({ ...prev, [field]: '' }));
        setFieldError(prev => ({ ...prev, [field]: '' }));
    }

    const validateFields = () => {
        let isValid = true;
        const newErrors = { firstName: '', lastName: '', email: '', username: '', password: '' };

        for (const [field, value] of Object.entries(credentials)) {
            const rule = rules.find(r => r.field === field);
            if (!rule) continue;

            const trimmedValue = value.trim();

            if (rule.required && trimmedValue === '') {
                newErrors[field] = "This field is required";
                isValid = false;
            } else if (rule.limit && trimmedValue.length > rule.limit) {
                newErrors[field] = `Maximum ${rule.limit} characters allowed`;
                isValid = false;
            } else if (rule.min && trimmedValue.length < rule.min) {
                newErrors[field] = `Minimum ${rule.min} characters required`;
                isValid = false;
            } else if (rule.isEmail && !regex.email.test(trimmedValue)) {
                newErrors[field] = "Invalid email format";
                isValid = false;
            }
        }

        setFieldError(newErrors);
        return isValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (fieldError[name]) {
            setFieldError(prev => ({ ...prev, [name]: '' }));
        }
    }

    const handleFieldError = (key, value) => {
        setFieldError(prev => {
            console.log(prev)
            return { ...prev, [key]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback([]);

        if (!validateFields()) return;

        setLoading(true);

        try {
            const response = await authService.register(credentials);

            if (response.status === 200) {
                navigate('/login');
            } else if (response.status === 400) {
                Object.entries(response.data).map(([key, value]) => handleFieldError(key, value.join(' ')))
            }
        } catch (error) {
            setFeedback([{ type: 'error', message: 'An unexpected error occurred. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative left-0 top-0 max-w-full w-full h-screen bg-linear-to-br from-neutral-800 to-neutral-900 backdrop-blur overflow-hidden flex justify-center items-center'>
            <div className='w-100 p-4 rounded-xl transition-all'>

                <div className='text-md flex flex-col items-center justify-between'>
                    <h1 className='text-mauve-50 text-2xl font-semibold mt-12 mb-4'>
                        Create your account
                    </h1>

                    <Link to='/login' className='text-mauve-400 text-sm'>
                        Already have an account? <strong className='text-mauve-100'>Login here</strong>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col p-2 gap-4 my-12'>

                    <Input
                        type='text'
                        name='firstName'
                        value={credentials.firstName}
                        onChange={handleChange}
                        placeholder='First name'
                        hasCounter={false}
                        error={fieldError.firstName}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='lastName'
                        value={credentials.lastName}
                        onChange={handleChange}
                        placeholder='Last name'
                        hasCounter={false}
                        error={fieldError.lastName}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder='Email address'
                        hasCounter={false}
                        error={fieldError.email}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder='Username'
                        hasCounter={false}
                        error={fieldError.username}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='password'
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder='Password'
                        hasCounter={false}
                        error={fieldError.password}
                        onClear={clearField}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Button
                        type='submit'
                        text='Sign Up'
                        loading={loading}
                        className='w-full rounded-2xl bg-white text-mauve-950 text-sm hover:w-full hover:bg-white/70'
                    />
                </form>

                <Feedback feedback={feedback} />
            </div>
        </div>
    )
}

export default Register