
import { useState } from 'react';
import IconArrowLeft from './components/icons/iconArrowL';
import IconArrowRight from './components/icons/iconArrowR';
import Diagram from './features/diagram/Diagram';
import TextEditor from './features/editor/TextEditor';
import SideBar from './features/navbar/SideBar';

function App() {

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (

    <section className='flex flex-row h-screen w-screen'>
      <div className='absolute top-0 left-0 z-20 md:relative flex flex-row h-full w-fit'>
        <SideBar>
          <button onClick={toggleSideBar} className=' z-20 bg-zinc-900 hover:bg-zinc-800 p-2 h-12 text-white rounded-b-md'>
            {
              isSideBarOpen ? (<IconArrowLeft fillColor='white' size={20} />) : (<IconArrowRight fillColor='white' size={20} />)
            }
          </button>
        </SideBar>

        <div className={`${isSideBarOpen ? "w-[36rem] " : "w-0"} flex flex-col  z-20 transition-width duration-200 shadow-lg`}>
          <TextEditor />
        </div>
      </div>

      {isSideBarOpen && <div  onClick={toggleSideBar} className='absolute top-0 left-0 bg-zinc-900 bg-opacity-80 h-full w-full md:hidden z-10'></div>}

      <div className={`flex flex-col w-full sm:${isSideBarOpen ? 'w-2/3' : 'w-full'} shadow-lg`}>
        <Diagram />
      </div>
    </section>

  )
}

export default App
