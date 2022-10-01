import logo from './logo.svg';
import './App.css';
import {useEffect, useMemo, useState} from 'react'

const someFunction = (num) => {
  console.log('computed', num);
  let i = 0
  while (i < 900000000) i++
  return num * 2
}

function App() {
  const [count, setCount] = useState(1)
  const [status, setStatus] = useState(false)

  const style = useMemo(() => ({
    color: status ? 'green' : 'red'
  }), [status])

  const computed = useMemo(() => {
    return someFunction(count)
  }, [count])
  
  useEffect(() => {
    console.log('style');
  },[style])

  return (
    <div className="App">
      <h1 style={style}>Счетчик {computed}</h1>
      <button onClick={() => setCount(prev => prev + 1)} >Добавить</button>
      <button onClick={() => setCount(prev => prev - 1)} >Убавить</button>
      <button onClick={() => setStatus(prev => !prev )}>Изменить</button>
    </div>
  );
}

export default App;
