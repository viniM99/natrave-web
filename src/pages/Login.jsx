import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import { ArrowLeft, User } from 'phosphor-react'

import logoPurple from '../assets/logo-purple.svg'

import { Input } from '../components/Input'

const validationSchema = yup.object().shape({
    email: yup.string().email('Digite um e-mail válido').required('Informe um e-mail'),
    password: yup.string().required('Digite uma senha')
})

export function Login() {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password
                }
            })

            setAuth(res.data)

        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to='/dashboard' replace={true} />
    }

    return (
        <div className='h-screen'>

            <header className='border-b-2 border-red-300 h-[4.5rem] flex justify-center'>
                <img 
                    className='w-20 md:w-40'
                    src={logoPurple} 
                    alt="" 
                />
            </header>

            <main className='container max-w-3xl mobile:px-[1.6rem]'>
                <div className='flex items-center py-8'>
                    <a href="/" className='text-red-500'>
                        <ArrowLeft size={30}/>
                    </a>

                    <p className='text-2xl text-red-700 pl-[1.6rem]'>Entre na sua conta</p>
                </div>

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container max-w-3xl mobile:px-[1.6rem]'>

                    <div className='flex justify-center pb-10'>
                        <User size={130} className='border-2 text-black border-gray-300 rounded-full p-2' />
                    </div>

                    <form className='px-4' onSubmit={formik.handleSubmit}>

                        <div>
                            <Input 
                                type='text'
                                name='email'
                                label='Seu e-mail'
                                placeholder='Digite seu e-mail'
                                error={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Input 
                                type='password'
                                name='password'
                                label='Sua senha'
                                placeholder='Digite sua senha'
                                error={formik.touched.password && formik.errors.password}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <button
                            className='text-white text-center bg-red-500 rounded-2xl w-full mt-8 py-3 hover:opacity-90 disabled:opacity-50'
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting}
                        > 
                            {formik.isSubmitting ? 'Carregando' : 'Entrar'}
                        </button>
                    </form>

                </div>
            </main>

        </div>
    )
}