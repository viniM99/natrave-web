import { useEffect, useState } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { useNavigate, useParams } from 'react-router-dom'
import { format, formatISO } from 'date-fns'
import axios from 'axios'

import logoWhite from '../assets/logo-white.svg'

import { ArrowLeft} from 'phosphor-react'

import { GameScore } from '../components/GameScore'
import { DateSelect } from '../components/DateSelect'

export function Profile() {
    const params = useParams()
    const navigate = useNavigate()

    const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))

    const [auth, setAuth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`,
        })

        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})

        return {
            ...res.data,
            hunches
        }
    })

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })

        return res.data
    })

    const logout = () => {
        setAuth({})
        navigate('/login')
    }

    const isLoading = games.loading || loading
    const hasError = games.error || error
    const isDone = !isLoading && !hasError

    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
    }, [currentDate])

    return (
        <>

            <header className='bg-red-500 flex flex-col justify-center px-2'>
                <div className='container max-w-3xl'>
                    <div className='flex justify-between pt-4'>
                        <img 
                            className='w-20 md:w-40'
                            src={logoWhite} 
                            alt="" 
                        />

                        {auth?.user?.id && (
                            <div
                                onClick={logout} 
                                className='text-white flex items-center gap-2 cursor-pointer'
                            >
                                Sair
                            </div>
                        )}
                    </div>

                    <div className='text-white bg-red-500 w-full flex items-center py-8'>
                        <a href="/dashboard">
                            <ArrowLeft size={30}/>
                        </a>

                        <h3 className='text-2xl font-bold pl-[1.6rem]'>{ user?.name }</h3>

                    </div>
                </div>
            </header>

            <main className='container max-w-3xl'>
               
                <div className='mobile:px-[1.6rem]'>
                    <p className='pt-12 pb-8 font-bold text-2xl text-red-500'>
                        Seus palpites
                    </p>

                    <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

                    <div>
                        {isLoading && 'Carregando jogos...'}
                        {hasError && 'Ops! Algo deu errado.'}

                        {isDone && games.value?.map(game => (
                            <GameScore 
                                key={ game.id }
                                gameId={ game.id }
                                gameTime={ format(new Date(game.gameTime), 'H:mm') }
                                homeTeam={ game.homeTeam }
                                awayTeam={ game.awayTeam }
                                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || ''}
                                disabled={true}
                            />
                        ))}
                    </div> 

                </div>

            </main>

        </>
    )
}