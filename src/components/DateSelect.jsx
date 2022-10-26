import { CaretLeft, CaretRight } from 'phosphor-react'

import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const DateSelect = ({ currentDate, onChange }) => {
    const date = new Date(currentDate)

    const prevDay = () => {
        const nextDate = subDays(date, 1)
        onChange(formatISO(nextDate))
    }

    const nextDay = () => {
        const nextDate = addDays(date, 1)
        onChange(formatISO(nextDate))
    }

    return (
        <div className='flex items-center justify-center gap-x-10'>
            <CaretLeft size={20} className='text-red-500 cursor-pointer' onClick={prevDay} />

                <span className='text-red-500 font-bold'>{format(date, "d 'de' MMMM", {locale: ptBR})}</span>

            <CaretRight size={20} className='text-red-500 cursor-pointer' onClick={nextDay} />
        </div>
    )
}