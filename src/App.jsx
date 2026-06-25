import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HomePage from "./Pages/HomePage"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='appConatiner'>
      <HomePage/>
    </div>
  )
}

export default App;
