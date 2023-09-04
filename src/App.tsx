
import { useEffect, useState } from 'react';
import IconArrowLeft from './components/icons/iconArrowL';
import IconArrowRight from './components/icons/iconArrowR';
import Diagram from './features/diagram/Diagram';
import TextEditor from './features/editor/TextEditor';
import SideBar from './features/main/SideBar';
import CopyButton from './features/main/CopyButton';
import { fromUrlSafeB64 } from './helpers/urlGenerators';
import { useDispatch } from 'react-redux';
import { setCodeText } from './store/codeTextSlice';

function App() {

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.has("code")) {
      const code = params.get("code")!;
      const decoded = fromUrlSafeB64(code);
      if (!decoded) return;
      dispatch(setCodeText(decoded));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <section className='flex flex-row h-screen w-screen'>
      <div className='absolute top-0 left-0 z-20 md:relative flex flex-row h-full w-fit'>
        <SideBar>
          <button title='Show/Hide Text Editor' onClick={toggleSideBar} className=' z-20 bg-zinc-900 hover:bg-zinc-800 p-2 h-12 text-white '>
            {
              isSideBarOpen ? (<IconArrowLeft fillColor='white' size={20} />) : (<IconArrowRight fillColor='white' size={20} />)
            }
          </button>

          <CopyButton extraClasses='h-12 mt-auto' />
        </SideBar>

        <div className={`${isSideBarOpen ? "w-[36rem] " : "w-0"} flex flex-col  z-20 transition-width duration-200 shadow-lg`}>
          <TextEditor />
        </div>
      </div>

      {isSideBarOpen && <div onClick={toggleSideBar} className='absolute top-0 left-0 bg-zinc-900 bg-opacity-80 h-full w-full md:hidden z-10'></div>}

      <div className={`flex flex-col w-full  shadow-lg`}>
        <Diagram />
      </div>
    </section>

  )
}

export default App
