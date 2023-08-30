
import TextEditor from './features/TextEditor';
import Diagram from './features/diagram/Diagram';



function App() {


  return (
    <section className='flex flex-row h-screen w-screen'>
      <div className='flex flex-col w-1/3'>
        <TextEditor />
      </div>


      <div className='flex flex-col w-2/3'>
        <Diagram />
      </div>
    </section>
  )
}

export default App
