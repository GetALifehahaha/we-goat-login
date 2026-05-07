import { useActionState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService.js'
import { Input, Button } from '../../shared/';
import registerSchema from '../schemas/registerSchema';
import * as z from 'zod';

const Register = () => {
    const navigate = useNavigate();

    const registerAction = async (_, formData) => {
        const credentials = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
        }

        const result = registerSchema.safeParse(credentials)

        if (!result.success) {
            const flat = z.flattenError(result.error)

            return { payload: credentials, errors: flat.fieldErrors, globalError: null, success: false }
        }

        try {
            await authService.register(credentials)


            return { payload: credentials, errors: {}, globalError: null, success: true }
        } catch (error) {
            console.log("Register error caught: ", error)
            return { payload: credentials, errors: { ...error }, globalError: null, success: false }
        }
    }

    const [registerState, formAction, isPending] = useActionState(registerAction, {
        payload: {},
        errors: {},
        globalError: null,
        success: false
    })

    useEffect(() => {
        if (registerState.success) {
            setTimeout(() => {
                navigate('/');
            }, 3000)
            clearTimeout();
        }
    }, [registerState.success, navigate])

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

                <form action={formAction} className='flex flex-col p-2 gap-4 my-12'>

                    <Input
                        type='text'
                        name='first_name'
                        label='First Name'
                        placeholder='First name'
                        defaultValue={registerState?.payload?.first_name || ""}
                        error={registerState?.errors?.first_name?.join('. ')}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='last_name'
                        label="Last Name"
                        defaultValue={registerState?.payload?.last_name || ""}
                        placeholder='Last name'
                        error={registerState?.errors?.last_name?.join('. ')}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='email'
                        label='Email Address'
                        defaultValue={registerState?.payload?.email || ""}
                        placeholder='Email address'
                        error={registerState?.errors?.email?.join('. ')}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='text'
                        name='username'
                        label="Username"
                        defaultValue={registerState?.payload?.username || ""}
                        placeholder='Username'
                        error={registerState?.errors?.username?.join('. ')}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Input
                        type='password'
                        name='password'
                        label="Password"
                        defaultValue={registerState?.payload?.password || ""}
                        placeholder='Password'
                        error={registerState?.errors?.password?.join('. ')}
                        className='rounded-2xl bg-neutral-900'
                    />

                    <Button
                        type={registerState.success ? 'button' : 'submit'}
                        text={registerState.success ? 'Proceed to Login Page' : 'Get Started!'}
                        loading={isPending}
                        onClick={() => {
                            if (registerState.success) {
                                navigate('/login')
                            }
                        }
                        }
                        className='w-full rounded-2xl bg-white text-mauve-950 text-sm hover:w-full hover:bg-white/70'
                    />
                    {registerState.success && <h5 className='text-sm text-green-500 p-1.5 rounded border border-green-700 text-center'>You have successfully registered to We-Goat! You will be automatically redirected to the login page in <strong>3</strong> seconds</h5>}
                </form>
            </div>
        </div>
    )
}

export default Register