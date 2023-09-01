
import { useState } from 'react';
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


      <div className={`${isSideBarOpen ? "" : "hidden"} flex flex-col w-4/5 sm:w-1/3  absolute top-0 left-0  sm:relative z-20 transition-width duration-200`}>
        <TextEditor />
      </div>

      <div className={`relative flex flex-col w-full sm:${isSideBarOpen ? 'w-2/3' : 'w-full'}`}>

    
          <button onClick={toggleSideBar} className='absolute top-0 z-20 bg-blue-900 hover:bg-blue-800 p-2 text-white'>
            <p className='font-bold'>Close</p>
          </button>
       

        <Diagram />
      </div>
    </section>

  )
}

export default App
