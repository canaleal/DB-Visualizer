
interface IModalProps {
    isOpen: boolean,
    handleClose: () => void,
    children: React.ReactNode
}

const Modal = ({ isOpen, handleClose, children }: IModalProps) => {


    return (
        <>  {isOpen && (
            <div className='fixed flex  z-[50] h-full w-full'>
                <div className='absolute z-[50] bg-black bg-opacity-80 h-full w-full' onClick={() => handleClose()}></div>
                <div className='my-auto  z-[60] mx-auto h-fit w-[32rem] bg-white rounded-md'>{children}</div>
            </div>
        )}</>
    )
}

export default Modal