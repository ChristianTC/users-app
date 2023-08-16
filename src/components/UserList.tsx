import { IUser } from "../interfaces/interfaces"

interface IProps {
  users: IUser[],
  showColor: boolean,
  handleDelete: (email:string) => void,
}

const UserList = ({users, showColor, handleDelete}:IProps) => {
  return (
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
        <tbody className={ showColor ? 'table--showColors' : ''}>
          {
            users.map(user => (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={()=>handleDelete(user.email)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
  )
}

export default UserList