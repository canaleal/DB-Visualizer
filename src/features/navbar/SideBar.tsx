import IconGear from "../../components/icons/iconGear"

interface ISideBarProps {
    extraClasses?: string
    children?: React.ReactNode
}

const SideBar = ({ extraClasses }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-zinc-900 text-white z-20 ${extraClasses} justify-between`}>
            <button className='bg-blue-900 hover:bg-blue-800 p-2 h-16'>
                <p className='font-bold'>MIN</p>
            </button>


            <button className='bg-blue-900 hover:bg-blue-800 p-2 h-16'>
                <IconGear fillColor='white' className="mx-auto" size={20} />
            </button>
        </div>
    )
}

export default SideBar