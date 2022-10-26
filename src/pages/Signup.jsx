import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import logoPurple from '../assets/logo-purple.svg'

import { ArrowLeft } from 'phosphor-react'

import { Input } from '../components/Input'

const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha seu nome'),
    username: yup.string().required('Preencha seu nome de usuário'),
    email: yup.string().email('Informe um e-mail válido').required('Informe um e-mail'),
    password: yup.string().required('Digite uma senha')
})

export function Signup() {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/users',
                data: values
            })

            window.localStorage.setItem('auth', JSON.stringify(res.data))

        },
        initialValues: {
            name: '',
            username: '',
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
                        <ArrowLeft size={30} className=' '/>
                    </a>

                    <p className='text-2xl text-red-700 pl-[1.6rem]'>Crie sua conta</p>
                </div>

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container max-w-3xl mobile:px-[1.6rem]'>

                    <form className='px-4' onSubmit={formik.handleSubmit}>

                        <div>
                            <Input 
                                type='text'
                                name='name'
                                label='Seu nome'
                                placeholder='Digite seu nome'
                                error={formik.touched.name && formik.errors.name}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Input 
                                type='text'
                                name='username'
                                label='Seu nome de usuário'
                                placeholder='Digite um nome de usuário'
                                error={formik.touched.username && formik.errors.username}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Input 
                                type='email'
                                name='email'
                                label='Seu e-mail'
                                placeholder='Digite seu melhor e-mail'
                                error={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Input 
                                type='password'
                                name='password'
                                label='Sua senha'
                                placeholder='Digite uma senha'
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
                            {formik.isSubmitting ? 'Carregando' : 'Criar minha conta'}
                        </button>
                        
                    </form>

                </div>
            </main>

        </div>
    )
}