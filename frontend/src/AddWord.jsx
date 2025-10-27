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
      await axios.post('/api/message', { goodWishes })
      setGoodwishes("")
      setSuccess("Word added successfully!")
    } catch (err) {
      setError("KUCH NAYA DAAL, YE PEHLE SE KOI LIKHA HAI")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Link to="/" className="mb-4 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold text-gray-700 text-center">Dost Ke Liye दुआएँ</h3>
        <input
          type="text"
          value={goodWishes}
          onChange={handleInput}
          placeholder="Kuch to likh ❤de"
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <h2 className={`text-center text-lg font-semibold ${error ? 'text-red-500' : 'text-green-500'}`}>
          {error || success}
        </h2>
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddWord
