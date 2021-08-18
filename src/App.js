import React, { useState, useEffect } from 'react'
import Navbar from './components/Navba';
import Load from './components/Load';
import './css/app.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)

  }, [])

  return (
    <>
      {loading ?
        <Load loading={loading} style={{ background: "DodgerBlue" }} />
        : 
          <Navbar />
        
      }
    </>
  )
}

export default App
