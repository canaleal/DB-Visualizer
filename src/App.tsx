
import { useState } from 'react';
import IconArrowRight from './components/icons/IconArrowRight';
import IconArrowLeft from './components/icons/iconArrowLeft';
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
      <SideBar />

      <div className={`${isSideBarOpen ? "w-4/5 sm:w-1/3  " : "w-0"} flex flex-col absolute top-0 left-0  sm:relative z-20 transition-width duration-200`}>
        <TextEditor />
      </div>

      <div className={`relative flex flex-col w-full sm:${isSideBarOpen ? 'w-2/3' : 'w-full'}`}>

        <button onClick={toggleSideBar} className='absolute top-4 left-4 z-20 bg-zinc-900 hover:bg-zinc-800 p-2 text-white'>
          {
            isSideBarOpen ? (<IconArrowLeft fillColor='white' size={20} />) : (<IconArrowRight fillColor='white' size={20} />)
          }
        </button>

        <Diagram />
      </div>
    </section>

  )
}

export default App
