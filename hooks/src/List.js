import React, {useEffect, useState} from 'react'
import axios from 'axios'

const ApiRequest = async (page) => {
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`)
  return res
}

const ItemList = ({page}) => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    console.log('render');
    ApiRequest(page)
    .then(res => {
      setItems(res.data.data)
    })
  }, [page])


  return (
    <ul>
      {items.map(i => <li key={i.id}>{i.email}</li>) }
    </ul>
  )
}

export default ItemList