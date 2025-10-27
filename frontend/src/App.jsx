import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import AddWord from './AddWord'

function Home() {
  const [goodwishes, setGoodwishes] = useState("__")

  useEffect(() => {
    const fetchGoodWishes = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/api/message`)
        setGoodwishes(response.data)
      } catch (error) {
        console.error("Error fetching good wishes:", error)
      }
    }

    // Fetch when mouse moves
    const handleMouseMove = () => {
      fetchGoodWishes()
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-green-900 text-white p-6 relative">
      
      {/* Navigation Button */}
      <Link
        to="/add-word"
        className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
      >
        Add Word
      </Link>

      <h1 className="text-5xl font-extrabold mb-6 animate-bounce text-center">
        Dost Ki Duayen 👋
      </h1>

      <h2 className="text-3xl bg-white/20 backdrop-blur-md rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-105 text-center">
        TU DOST NAHI <span className='text-yellow-200'>{goodwishes?.goodWishes || goodwishes}</span> HAI
      </h2>

      <h3 className="text-gray-300 font-semibold mt-8 text-center transition-colors duration-300 hover:text-yellow-400">
        Hover below to find your true self
      </h3>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-word" element={<AddWord />} />
      </Routes>
    </Router>
  )
}

export default App
