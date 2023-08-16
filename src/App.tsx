

import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'https://randomuser.me/api/?results=100'

interface IUsers {
  users: [],
  prevUsers: [],
  initialUsers: [],
}

const App = () => {

  const [usersData, setUsersData]: [usersData:IUsers, setUsersData: any] = useState({users: [], prevUsers: [],initialUsers: []})
  const [isColor, setIsColor] = useState(false)
  const [isSorted, setIsSorted] = useState(false)

  const [inputValue, setInputValue] = useState("");

  const handleColor = () => {
    setIsColor(!isColor)
  }

  const handleReset = async () => {
    setUsersData({
      ...usersData,
      prevUsers: [...usersData.initialUsers],
      users: [...usersData.initialUsers]
    });
    setIsSorted(false)
  }

  const restorePrevData = () => {
    setUsersData({
      ...usersData,
      users: [...usersData.prevUsers]
    })
    setIsSorted(false)
  }

  const orderByCountry = (value:string) => {
    if (inputValue.length===0) {
      setUsersData({
        ...usersData,
        prevUsers: isSorted ? usersData.prevUsers : [...usersData.users],
        users: usersData.users.sort( (wordA:any, wordB:any) => {
          switch (value) {
            case 'First':
              return wordA['name']['first'] < wordB['name']['first'] ? -1: 1
            case 'Last':
                return wordA['name']['last'] < wordB['name']['last'] ? -1: 1
            case 'Country':
              return wordA['location']['country'] < wordB['location']['country'] ? -1: 1
              
            default:
              return ( wordA['location']['country'] )
          }
        })
      })
      setIsSorted(true)
    }
  }

  const removeUser = (id:string) => {
    setUsersData({
      ...usersData,
      prevUsers: usersData.prevUsers.filter((user)=>user['id']['value']!==id),
      users: usersData.users.filter((user)=>user['id']['value']!==id)
    })
  }

  useEffect(()=>{
    fetch(API_URL)
      .then(response => response.json())
      .then( data => {
        setUsersData({
          users: [...data.results],
          prevUsers: [...data.results],
          initialUsers: [...data.results]
        })
      })
  },[])

  return (
    <>
      <main>
        <h1>USER APP</h1>
      </main>

      <header>
        <button onClick={handleColor}>Colorea filas</button>
        {
          !isSorted
            ? <button onClick={() => orderByCountry('Country')}>Ordena por país</button>
            : <button onClick={restorePrevData}>No ordena por país</button>
           
        }
        <button onClick={handleReset}>Restaurar estado inicial</button>
        <input 
          placeholder='Filtrar por país'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </header>

      <section>
        <table>
          <tbody>
          <tr>
            <th>Foto</th>
            <th onClick={() => orderByCountry('First')}>Nombre</th>
            <th onClick={() => orderByCountry('Last')}>Apellido</th>
            <th onClick={() => orderByCountry('Country')}>País</th>
            <th>Acciones</th>
          </tr>
            {usersData.users.map((user: any, index: number)=>{
              return (
                (user['location']['country'].toLowerCase().includes(inputValue.toLowerCase()))
                &&
                <tr key={index} className={
                  isColor ? 'color-rows-odd color-rows-even':''
                }>
                  <td><img src={user['picture']['thumbnail']} alt="" /></td>
                  <td>{user['name']['first']}</td>
                  <td>{user['name']['last']}</td>
                  <td>{user['location']['country']}</td>
                  <td><button onClick={() => removeUser(user['id']['value'])}>Delete</button></td>
                </tr>
              )
            })}

          </tbody>
        </table>
        
      </section>
      
    </>
  )
}

export default App