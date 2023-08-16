import axios from "axios"

import './App.css'
import { useState, useEffect, useRef, useMemo } from 'react';
import { IUser, SortBy } from "./interfaces/interfaces";
import UserList from "./components/UserList";

const App = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sortedBy, setSortedBy] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const initialUsers = useRef<IUser[]>([])

  const toggleColor = () => (
    setShowColor(prevState => !prevState)
  )

  const toggleSortByCountry = () => {
    const valueSort = sortedBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortedBy(valueSort)
  }

  const handleDelete = (email:string) => {
    setUsers(users.filter((user)=>user.email!==email))
  }

  const handleReset = () => {
    setUsers(initialUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSortedBy(sort)
  }

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => {
        setUsers(response.data.results)
        initialUsers.current = response.data.results
      })
      .catch(err => console.error(err))
  }, [])

  const sortedUsers:IUser[] = useMemo(() => {
    console.log('SORTED');
    return sortedBy !== SortBy.NONE
      ? users.toSorted((userA: IUser, userB: IUser) => {
          switch (sortedBy) {
            case SortBy.COUNTRY:
              return userA.location.country.localeCompare(userB.location.country)
            case SortBy.FIRST:
              return userA.name.first.localeCompare(userB.name.first)
            case SortBy.LAST:
              return userA.name.last.localeCompare(userB.name.last)
        }
      })
      : users
  }, [users, sortedBy])

  const filteredUsers:IUser[] = useMemo(() => {
    console.log('FILTER');
    return filterCountry && filterCountry.length>0 
    ? sortedUsers.filter(user=>user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : sortedUsers
  }, [sortedUsers, filterCountry])

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
        <UserList users={filteredUsers} showColor={showColor} handleDelete={handleDelete} handleChangeSort={handleChangeSort}/>
      </main>

    </div>
  )
}

export default App