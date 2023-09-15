
import { useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Diagram from './features/diagram/Diagram';
import TextEditor from './features/editor/TextEditor';
import SideBar from './features/main/SideBar';
import ShareOption from './features/main/ShareOption';
import { fromUrlSafeB64 } from './helpers/urlGenerators';
import { useDispatch } from 'react-redux';
import { setSelectedScript } from './store/scriptSlice';
import ResetOption from './features/main/ResetOption';
import SettingsOption from './features/main/SettingsOption';
import ImportSqlOption from './features/main/ImportSQLOption';
import ExportSqlOption from './features/main/ExportSQLOption';
import { IScript } from './types';

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

      const script: IScript = JSON.parse(decoded);
      dispatch(setSelectedScript(script));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <section className='flex flex-row h-screen w-screen'>
      <div className='absolute top-0 left-0 z-20 md:relative flex flex-row h-full w-fit'>
        <SideBar>
          <button title='Show/Hide Text Editor' onClick={toggleSideBar} className=' z-20 bg-zinc-900 hover:bg-zinc-800 p-2 h-12 text-white '>
            {
              isSideBarOpen ? (<IconArrowLeft stroke='white' size={20} strokeWidth={2} />) : (<IconArrowRight stroke='white' size={20} strokeWidth={2} />)
            }
          </button>

          <ShareOption extraClasses='h-12' />

          <ImportSqlOption extraClasses='h-12' />

          <ExportSqlOption extraClasses='h-12' />

          <ResetOption extraClasses='h-12' />

          <SettingsOption extraClasses='h-12 mt-auto' />
        </SideBar>

        <div className={`${isSideBarOpen ? "w-[36rem] " : "w-0"} flex flex-col  z-10 transition-width duration-200 shadow-lg`}>
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
