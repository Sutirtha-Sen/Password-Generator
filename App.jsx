import { useState , useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[char,setChar]=useState(false);
  const[password,setPassword]=useState("");

  const passwordRef=useRef(null)

  const passwordGen=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(number) str +="0123456789";
    if(char) str +="!@#$%^&*><`~";

    for (let i = 0; i <= length; i++) {
      let character=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(character)
      
    }
    setPassword(pass)
  },[length,number,char,setPassword])

  const copyPass=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert('Password Copied!')
    passwordRef.current?.select()
  },[password])

useEffect(()=>{
  passwordGen()
},[length,number,char,passwordGen])

  return (
    <>
      <div className='w-full rounded-lg max-w-md mx-auto px-4 py-2 my-8 shadow-md text-black bg-yellow-500'>
        <h1 className='text-3xl font-bold text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow overflow-hidden rounded-lg mb-4'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full px-3 py-1'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPass} className='outline-none bg-blue-600 hover:bg-blue-500 duration-300 px-3 py-2.5 shrink-0 '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            /><label className='text-black'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
                  type='checkbox'
                  defaultChecked={number}
                  id='numberInput'
                  onChange={()=>{
                    setNumber((prev)=>!prev);
                  }}
            />
            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
                  id='charInput'
                  type='checkbox'
                  defaultChecked={char}
                  onChange={()=>{
                    setChar((prev)=>!prev);
                  }}
            /><label htmlFor='charInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
