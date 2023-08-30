interface ISideBarProps {
    extraClasses?: string
}

const SideBar = ({ extraClasses }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-zinc-90 text-white z-20 ${extraClasses}`}>
            <button className='bg-primary hover:bg-primary-dark p-2'>
                <p className='font-bold'>MIN</p>
            </button>
        </div>
    )
}

export default SideBar