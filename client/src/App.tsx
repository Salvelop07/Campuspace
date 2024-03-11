import './App.css'
import { Routes, Route } from 'react-router-dom'
import TimetableAdmin from './components/TimetableAdmin'
// import Navbar from './components/Navbar'
import { TableDemo } from './components/TableDemo'
import TeachersAbsentAdmin from './components/TeachersAbsentAdmin'
import TeachersAbsent from './components/TeachersAbsent'
import Login from './components/Login'
import ErrorPage from './components/ErrorPage'
import Timetable from './components/Timetable'
import { ModeToggle } from './components/ModeToggle'

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <ModeToggle />
      <Routes>
        <Route element={<Login />} path="/admin/login" />
        <Route element={<TimetableAdmin />} path="/admin/timetable" />
        <Route element={<TeachersAbsentAdmin />} path="/admin/teachersabsent" />

        <Route element={<Timetable />} path="/timetable" />
        <Route element={<TableDemo />} path="/" />
        <Route element={<TeachersAbsent />} path="/teachersabsent" />

        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </>
  )
}

export default App
