import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddWord() {
  const [goodWishes, setGoodwishes] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInput = (e) => {
    setGoodwishes(e.target.value)
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!goodWishes.trim()) {
      setError("Please enter a valid word!")
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      await axios.post(`${apiUrl}/api/message`, { goodWishes })
      setGoodwishes("")
      setSuccess("Word added successfully! 💫")
    } catch (err) {
      console.error("Error:", err)
      setError("KUCH NAYA DAAL, YE PEHLE SE KOI LIKHA HAI 😅")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 p-6 text-white">
      <Link 
        to="/" 
        className="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-md text-sm hover:bg-white/30 transition-colors"
      >
        ← Back to Home
      </Link>

      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 w-80 bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/30"
      >
        <h3 className="text-2xl font-bold text-center text-white drop-shadow-md">
          Dost Ke Liye Duayen 🤍
        </h3>

        <input
          type="text"
          value={goodWishes}
          onChange={handleInput}
          placeholder="Kuch to likh ❤ de"
          className="p-2 rounded-md border border-white/30 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />

        <h2 className={`text-center text-md font-semibold ${error ? 'text-red-200' : 'text-green-200'}`}>
          {error || success}
        </h2>

        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold p-2 rounded hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddWord
