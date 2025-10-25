import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Prestation from './pages/Prestation.jsx'
import Tarifs from './pages/Tarifs.jsx'
import Contact from './pages/Contact.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Mentions from './pages/Mentions.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Prestation' element={<Prestation />} />
        <Route path='/Tarifs' element={<Tarifs />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Calendar' element={<CalendarPage />} />
        <Route path='/Mentions' element={<Mentions />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </ HashRouter>
  )
}