import axios from "axios"

import './App.css'
import { useState, useEffect } from 'react';
import { IUser } from "./interfaces/interfaces";
import UserList from "./components/UserList";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [showColor, setShowColor] = useState(false)
  const [filterCountry, setFilterCountry] = useState(false)
  

  const toggleColor = () => (
    setShowColor(prevState => !prevState)
  )

  const toggleSortByCountry = () => {
    setFilterCountry(prevstate => !prevstate)
  }

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => setUsers(response.data.results))
      .catch(err => console.error(err))
  }, [])
  
  const sortedUsers:IUser[] = filterCountry 
    ? users.toSorted((userA: IUser, userB: IUser) => {
      return userA.location.country.localeCompare(userB.location.country)
    })
    : users

  return (
    <div className="app">
      <h2>USERS APP</h2>

      <header>
        <button onClick={toggleColor}>Color the rows</button>
        <button onClick={()=>toggleSortByCountry()}>Sort by country</button>
      </header>
      <main>
        <UserList users={sortedUsers} showColor={showColor}/>
      </main>

    </div>
  )
}

export default App