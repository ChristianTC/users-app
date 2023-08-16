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
      <h2>USERS APP</h2>

      <table width={'100%'}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default App