import axios from "axios"

import './App.css'
import { useState, useEffect, useRef } from 'react';
import { IUser } from "./interfaces/interfaces";
import UserList from "./components/UserList";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sortedByCountry, setSortedByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const initialUsers = useRef<IUser[]>([])

  const toggleColor = () => (
    setShowColor(prevState => !prevState)
  )

  const toggleSortByCountry = () => {
    setSortedByCountry(prevstate => !prevstate)
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
  
  const filteredUsers:IUser[] = filterCountry && filterCountry.length>0 
    ? users.filter(user=>user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users

  const sortedUsers:IUser[] = sortedByCountry 
    ? filteredUsers.toSorted((userA: IUser, userB: IUser) => {
      return userA.location.country.localeCompare(userB.location.country)
    })
    : filteredUsers

  return (
    <div className="app">
      <h2>USERS APP</h2>

      <header>
        <button onClick={toggleColor}>Color the rows</button>
        <button onClick={()=>toggleSortByCountry()}>Sort by country</button>
        <button onClick={handleReset}>Reset state</button>
        <input type="text" placeholder="filter by country" onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>
      <main>
        <UserList users={sortedUsers} showColor={showColor} handleDelete={handleDelete}/>
      </main>

    </div>
  )
}

export default App