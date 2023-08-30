
import Diagram from './features/diagram/Diagram';
import TextEditor from './features/editor/TextEditor';

function App() {
  return (

    <section className='flex flex-row h-screen w-screen'>
      <div className='flex flex-col w-1/2 md:w-1/3'>
        <TextEditor />
      </div>
      <div className='flex flex-col w-1/2 md:w-2/3'>
        <Diagram />
      </div>
    </section>

  )
}

export default App
