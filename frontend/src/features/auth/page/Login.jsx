import { useActionState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input, Button, PageLogo } from '../../shared/';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../schemas/loginSchema';
import * as z from 'zod';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginAction = async (_, formData) => {
        const credentials = {
            username: formData.get("username"),
            password: formData.get("password")
        }

        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
            const flat = z.flattenError(result.error);

            return {
                payload: credentials,
                errors: flat.fieldErrors,
                globalError: null,
                success: false
            }
        }

        try {
            await login(credentials);

            navigate('/');
            return {
                payload: {},
                globalError: null,
                errors: null,
                success: true
            }
        } catch (error) {
            console.log(error)
            return {
                payload: credentials,
                errors: null,
                globalError: error,
                success: false
            }
        }
    }

    const [loginState, formAction, isPending] = useActionState(loginAction, {
        payload: {},
        errors: {},
        globalError: null,
        success: false
    })

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
                <form action={formAction}
                    className='flex flex-col p-2 gap-4 my-12 mb-6'
                >
                    <Input
                        label="Username"
                        type='text'
                        name='username'
                        defaultValue={loginState?.payload?.username || ""}
                        placeholder='Your username'
                        error={loginState?.errors?.username?.join('. ')}
                        className=' rounded-2xl bg-neutral-900'
                    />

                    <Input
                        label="Password"
                        type='password'
                        name='password'
                        defaultValue={loginState?.payload?.password || ""}
                        placeholder='Your password'
                        error={loginState?.errors?.password?.join('. ')}
                        className='rounded-2xl bg-neutral-900 relative'
                    />
                    <Button type='submit' loading={isPending} text='Login' className='w-full rounded-2xl bg-white text-mauve-950 text-sm hover:w-full hover:bg-white/70 mt-0' />
                    {loginState?.globalError && <h5 className='text-sm text-red-400 rounded p-2 text-center border border-red-400'>{loginState?.globalError}</h5>}
                </form>

                <hr className='w-full text-white/20' />
                <h5 className='text-xs text-white/30 text-center mt-2 font-light tracking-wide'>Empowered by Django, DRF, and React</h5>
            </div>
        </div >
    )
}

export default Login