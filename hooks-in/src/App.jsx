import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => { //optimize ki bat kr re h 
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"
    for (let i = 0; i < count; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [count, numberAllowed, charAllowed])

  useEffect(() => {           //kuchb ched chad h to frse run kr 
    passwordGenerator()
  }, [count, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className="text-white text-center">Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        > Copy </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="cursor-pointer"
          />
          <label className="text-white"> Length: {count} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            id="numberInput"
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor="numberInput" className="text-white">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            id="charallowed"
            type="checkbox"
            checked={charAllowed}
            onChange={() => { setCharAllowed(prev => !prev) }}
          />
          <label htmlFor="charallowed" className="text-white">Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App  