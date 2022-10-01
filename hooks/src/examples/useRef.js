import axios from 'axios'
import './App.css';
import {useEffect, useRef, useState} from 'react'


function App() {
  const stateRef = useRef(1)
  const inputRef = useRef('')
  const [colored, setColored] = useState(false)
  const [value, setValue] = useState('')


  useEffect(() => {
    console.log('render', inputRef.current);
    stateRef.current ++
  })



  return (
    <div style={{height:'300vw'}}  className="App">
      <button  onClick={() =>  window.scrollTo(0, inputRef.current.offsetTop)}>Изменить</button>

      <h1>value: {value}</h1>
      <h1>renders: {stateRef.current}</h1>
      <input
        style={{marginTop:'100vw'}}
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
}

export default App;
