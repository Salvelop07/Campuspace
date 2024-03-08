import './App.css'
import { Routes, Route } from 'react-router-dom'
import Timetable from './components/Timetable'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Timetable />} path="/timetable" />
        <Route element={<>hello</>} path="/" />
      </Routes>
    </>
  )
}

export default App
