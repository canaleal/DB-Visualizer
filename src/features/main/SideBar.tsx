

interface ISideBarProps {
    extraClasses?: string
    children?: React.ReactNode
}

const SideBar = ({ extraClasses, children }: ISideBarProps) => {
    return (
        <div className={`flex flex-col bg-dark text-white z-20 ${extraClasses} `}>
            {children}
        </div>
    )
}

export default SideBar