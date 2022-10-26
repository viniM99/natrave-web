import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required()
})

export const GameScore = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore, gameTime }) => {
    const [auth] = useLocalStorage('auth')

    const formik = useFormik({
        onSubmit: (values) => {
            axios({
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/hunches',
                headers: {
                    authorization: `Bearer ${auth.accesToken}`
                },
                data: {
                    ...values,
                    gameId
                }
            })
        },
        initialValues: {
            homeTeamScore,
            awayTeamScore
        },
        validationSchema
    })

   return (
    <div className='flex flex-col items-center mt-8 py-4 border-[1px] border-gray-300 rounded-2xl mobile:mt-4'>
        <span className='text-sm text-gray-700 font-bold mb-4'>{gameTime}</span>

        <form className='flex items-center gap-x-4 mobile:gap-x-2'>

            <span className='text-sm text-gray-700 uppercase'>{homeTeam}</span>
            <img className='' src={`/flags/${homeTeam}.png`} alt="" />
            <input 
                className='bg-red-300/20 w-12 h-12 rounded-full text-black text-center outline-0' 
                type='number'
                name="homeTeamScore"
                value={formik.values.homeTeamScore}
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit}
                disabled={disabled}
            />
            
            <span className='text-red-300 font-bold'>X</span>

            <input 
                className='bg-red-300/20 w-12 h-12 rounded-full text-black text-center outline-0' 
                type='number'
                name="awayTeamScore"
                value={formik.values.awayTeamScore}
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit} 
                disabled={disabled}
            />
            <img className='' src={`/flags/${awayTeam}.png`} alt="" />
            <span className='text-sm text-gray-700 uppercase'>{awayTeam}</span>

        </form>
    </div>
   )
}