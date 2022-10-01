import axios from 'axios'
import './App.css';
import {useCallback, useEffect, useMemo, useState} from 'react'
import ItemList from './List';

function App() {
  const [colored, setColored] = useState(false)
  const [count, setCount] = useState(1)

  const styles = {
    color: colored ? 'darkred' : 'black'
  }

  const ApiRequest = async () => {
    const res = await axios.get('https://reqres.in/api/users')
    return res
  }
  


  return (
    <div className="App">
      <h1 style={styles}>Количество элементов: {count}</h1>
      <button  onClick={() => setCount(prev => prev + 1)}>Добавить</button>
      <button  onClick={() => setColored(prev => !prev)}>Изменить</button>

      <ItemList getItems={ApiRequest} />
    </div>
  );
}

export default App;
