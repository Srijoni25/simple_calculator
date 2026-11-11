import React, { useState } from 'react'

export default function App() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [op, setOp] = useState('add')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    const payload = { a: parseFloat(a), b: parseFloat(b), op }
    try {
      const res = await fetch('http://localhost:8000/calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || 'Error')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Simple Calculator</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          placeholder="First number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          step="any"
          required
        />
        <select value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="add">+</option>
          <option value="sub">-</option>
          <option value="mul">*</option>
          <option value="div">/</option>
        </select>
        <input
          type="number"
          placeholder="Second number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          step="any"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && <p className="error">Error: {error}</p>}
      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  )
}
