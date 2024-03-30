

import './App.css'
//import DragAndDropUI from './components/ui/DragAndDropUI'
import KanbanBoardUI from './components/ui/KanbanBoardUI'



function App() {


  return (
    <>
      <h1 className='text-blue-200 bg-teal-800 border'>REACT: DRAG AND DROP <a href='https://docs.dndkit.com/' target='_blank' className='pl-8 text-pink-200 underline'>dnd docs</a></h1>
      <br /><br />
      {/*<DragAndDropUI />*/}
      <KanbanBoardUI />
    </>
  )
}

export default App
