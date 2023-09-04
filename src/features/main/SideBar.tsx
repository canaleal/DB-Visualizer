

interface ISideBarProps {
    extraClasses?: string
    children?: React.ReactNode
}

const SideBar = ({ extraClasses, children }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-zinc-900 text-white z-20 ${extraClasses} `}>
            {children}
        </div>
    )
}

export default SideBar