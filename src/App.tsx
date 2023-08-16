import axios from "axios"

import './App.css'
import { useState, useEffect } from 'react';
import { IUser } from "./interfaces/interfaces";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => setUsers(response.data.results))
      .catch(err => console.error(err))
  }, [])
  

  return (
    <div className="app">
      <h1>USERS APP</h1>
      { JSON.stringify(users) }
    </div>
  )
}

export default App