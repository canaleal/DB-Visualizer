import IconDatabase from "../../components/icons/iconDatabase"
import IconGear from "../../components/icons/iconGear"

interface ISideBarProps {
    extraClasses?: string
    children?: React.ReactNode
}

const SideBar = ({ extraClasses }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-zinc-900 text-white z-20 ${extraClasses} justify-between `}>
            <button className='bg-indigo-900 hover:bg-indigo-800 p-2 h-12 rounded-b-md'>
                <IconDatabase fillColor='white' className="mx-auto" size={20} />
            </button>


            <button className='bg-indigo-900 hover:bg-indigo-800 p-2 h-12 rounded-t-md'>
                <IconGear fillColor='white' className="mx-auto" size={20} />
            </button>
        </div>
    )
}

export default SideBar