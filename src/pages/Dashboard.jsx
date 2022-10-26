import { useEffect, useState } from 'react'
import { useAsync, useAsyncFn, useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

import logoWhite from '../assets/logo-white.svg'

import { UserCircle } from 'phosphor-react'

import { GameScore } from '../components/GameScore'
import { DateSelect } from '../components/DateSelect'


export function Dashboard() {
    const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))

    const [auth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`,
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

    const isLoading = games.loading || loading
    const hasError = games.error || error
    const isDone = !isLoading && !hasError

    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
    }, [currentDate])

    if (!auth?.user?.id) {
        return <Navigate to='/' replace={true} />
    }

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

                        <div className='text-white flex items-center gap-2'>
                            <p className='mobile:text-sm'>{`Olá, ${auth?.user?.name}`}</p>

                            <a href={`/${auth?.user?.username}`}>
                                <UserCircle size={44} className='mobile:w-8'/>
                            </a>
                        </div>
                    </div>

                    <div className='bg-red-500 w-full items-center py-8'>
                        

                        <h3 className='text-white text-2xl font-bold'>Qual é o seu palpite?</h3>
                    </div>
                </div>
            </header>

            <main className='container max-w-3xl'>
               
                <div className='mobile:px-[1.6rem]'>

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
                            />
                        ))}
                    </div> 
                    
                </div>

            </main>

        </>
    )
}