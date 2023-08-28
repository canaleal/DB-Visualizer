
import { useSelector } from 'react-redux';
import Markdown from './features/Markdown';
import TextEditor from './features/TextEditor';


function App() {


  return (
    <section className='flex flex-row h-screen w-screen'>
      <div className='flex flex-col w-1/2'>
        <TextEditor />
      </div>


      <div className='flex flex-col w-1/2'>

        <Markdown />


      </div>
    </section>
  )
}

export default App
