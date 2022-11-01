export const Input = ({ name, label, error, ...props }) => (
    <div className='flex flex-col w-full'>
        <label
            className='text-sm text-gray-500 pt-4 pb-2 font-semibold' 
            htmlFor={name}
        >
            {label}
        </label>
        <input
            className={`p-3 border-[1px] border-gray-500 rounded-2xl placeholder:text-gray-700 ${error && 'border-red-400'}`} 
            {...props} 
            name={name} 
            id={name} 
        />
        <span className="pl-2 text-sm text-red-400">{error}</span>

    </div>
)