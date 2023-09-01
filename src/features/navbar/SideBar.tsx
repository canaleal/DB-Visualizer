interface ISideBarProps {
    extraClasses?: string
}

const SideBar = ({ extraClasses }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-zinc-900 text-white z-20 ${extraClasses}`}>
            <button className='bg-blue-900 hover:bg-blue-800 p-2'>
                <p className='font-bold'>MIN</p>
            </button>
        </div>
    )
}

export default SideBar