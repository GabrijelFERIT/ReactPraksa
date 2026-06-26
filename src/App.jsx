import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HomePage from "./Pages/HomePage"
import './App.css'
import ElectronicsListCRUD from "./features/products/ElectronicsUI"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='appConatiner'>
        <Routes>
          <Route path = "/" element={<HomePage/>}></Route>
          <Route path = "/electronics" element={<ElectronicsListCRUD/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
