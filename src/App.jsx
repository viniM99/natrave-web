import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import './styles/main.css'

import logoImg from './assets/logo-underline.svg'
import homeImg from '/img-onboarding.png'

function App() {
  const [auth] = useLocalStorage('auth', {})

  if (auth?.user?.id) {
    return <Navigate to='/dashboard' replace={true} />
  }

  return (
    <div className="bg-red-700 h-screen flex flex-col">

      <header className="h-[72px] flex items-center justify-center mb-6 md">
          <img 
            className="w-20 h-6 md:w-[200px] md:h-10" 
            src={logoImg} 
            alt="Logo da aplicação" 
          />
      </header>

      <section className="flex flex-1 flex-col items-center md:flex-row md:items-center">
        <div className="flex justify-center mb-4 md:flex-1">
          <img 
            className="w-80 h-80 md:w-[37.5rem] md:h-[37.5rem]" 
            src={homeImg} 
            alt="Imagem de duas pessoas com camiseta do Brasil"
          />
        </div>

        <div className="md:flex-1">
          <div className="flex flex-col md:pr-30">
            <h1 
              className="text-white font-bold text-[32px] leading-10 text-center px-9 pb-8 md:text-7xl md:text-left"
            >
            Dê o seu palpite na Copa do Mundo do Catar 2022!
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <a href="/signup"
              className="flex justify-center items-center w-72 h-12 bg-white rounded-2xl text-red-700 hover:opacity-[.85]"
            >
              Criar minha conta
            </a>

            <a href="/login"
              className="flex justify-center items-center w-72 h-12 border-[1px] border-white rounded-2xl text-white hover:opacity-80"
            >
              Fazer login
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default App
