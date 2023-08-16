import axios from "axios"

import './App.css'
import { useState, useEffect } from 'react';
import { IUser } from "./interfaces/interfaces";
import UserList from "./components/UserList";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [showColor, setShowColor] = useState(false)

  const toggleColor = () => (
    setShowColor(prevState => !prevState)
  )

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => setUsers(response.data.results))
      .catch(err => console.error(err))
  }, [])
  

  return (
    <div className="app">
      <h2>USERS APP</h2>

      <header>
        <button onClick={toggleColor}>Color the rows</button>
      </header>
      <main>
        <UserList users={users} showColor={showColor}/>
      </main>

    </div>
  )
}

export default App