import axios from "axios"

import './App.css'
import { useState, useEffect, useRef } from 'react';
import { IUser } from "./interfaces/interfaces";
import UserList from "./components/UserList";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [showColor, setShowColor] = useState(false)
  const [filterCountry, setFilterCountry] = useState(false)
  
  const initialUsers = useRef<IUser[]>([])

  const toggleColor = () => (
    setShowColor(prevState => !prevState)
  )

  const toggleSortByCountry = () => {
    setFilterCountry(prevstate => !prevstate)
  }

  const handleDelete = (email:string) => {
    setUsers(users.filter((user)=>user.email!==email))
  }

  const handleReset = () => {
    setUsers(initialUsers.current)
  }

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => {
        setUsers(response.data.results)
        initialUsers.current = response.data.results
      })
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
        <button onClick={handleReset}>Reset state</button>
      </header>
      <main>
        <UserList users={sortedUsers} showColor={showColor} handleDelete={handleDelete}/>
      </main>

    </div>
  )
}

export default App